package com.upgrad.orderprocessingservice.service;

import com.upgrad.orderprocessingservice.entity.Order;
import com.upgrad.orderprocessingservice.exception.OrderProcessingFailedException;
import com.upgrad.orderprocessingservice.feign.PaymentClient;
import com.upgrad.orderprocessingservice.model.OrderResponseVO;
import com.upgrad.orderprocessingservice.model.OrderVO;
import com.upgrad.orderprocessingservice.model.PaymentResponseVO;
import com.upgrad.orderprocessingservice.repository.OrderProcessingRepository;
import feign.FeignException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import static com.upgrad.orderprocessingservice.constants.OrderProcessingConstants.*;

@Service
@Log4j2
public class OrderProcessingService {

    private PaymentClient paymentClient;
    private OrderProcessingRepository repository;
    @Value("${order-processing-topic}")
    private String orderProcessingTopic;

    @Autowired
    KafkaTemplate kafkaTemplate;

    public OrderProcessingService(PaymentClient paymentClient, OrderProcessingRepository repository){
        this.paymentClient=paymentClient;
        this.repository = repository;
    }

    public OrderResponseVO createOrder(OrderVO orderVO) throws OrderProcessingFailedException {
        PaymentResponseVO responseVO = null;
        try {
            log.info("Calling payment service for order "+orderVO.getOrderId());
            responseVO = paymentClient.getPaymentStatus(orderVO.getOrderId());
        }catch(FeignException e){
            throw new OrderProcessingFailedException();
        }
        OrderResponseVO orderResponseVO = OrderResponseVO
                .builder()
                .orderId(orderVO.getOrderId())

                .build();
        if(PAYMENT_SUCCESS.equals(responseVO.getPaymentStatus())){
            repository.save(Order.builder()
                    .orderId(orderVO.getOrderId())
                    .orderAmount(orderVO.getOrderAmount())
                    .orderStatus(ORDER_CREATED)
                    .paymentReferenceNumber(responseVO.getPaymentReferenceNumber())
                    .build());
            orderResponseVO.setOrderStatus(ORDER_CREATED);
        }else{
            repository.save(Order.builder()
                    .orderId(orderVO.getOrderId())
                    .orderAmount(orderVO.getOrderAmount())
                    .orderStatus(ORDER_PROCESSING_FAILED)
                    .build());
            orderResponseVO.setOrderStatus(ORDER_PROCESSING_FAILED);
        }
        //Fetch the user details corresponding to the order
        sendNotification(orderResponseVO);
        return orderResponseVO;
    }

    /**
     * Send the message to notification service via kafka
     * @param orderResponseVO
     */
    private void sendNotification(OrderResponseVO orderResponseVO){
        kafkaTemplate.send(
                MessageBuilder.withPayload(orderResponseVO)
                .setHeader(KafkaHeaders.TOPIC,orderProcessingTopic)
                        .setHeader("EVENT_TYPE",orderResponseVO.getOrderStatus())
                        .build()
        );
    }

    @KafkaListener(topics = "${order-processing-topic}", groupId = "1")
    private void orderProcessingListener(Message<OrderResponseVO> message){
        System.out.println("Recieved message from Kafka "+message.getPayload());
    }
}
