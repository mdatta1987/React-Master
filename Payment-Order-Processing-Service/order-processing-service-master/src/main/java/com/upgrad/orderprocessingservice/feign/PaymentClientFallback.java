package com.upgrad.orderprocessingservice.feign;

import com.upgrad.orderprocessingservice.exception.OrderProcessingFailedException;
import com.upgrad.orderprocessingservice.model.PaymentResponseVO;
import org.springframework.stereotype.Component;

@Component
public class PaymentClientFallback implements PaymentClient{

    @Override
    public PaymentResponseVO getPaymentStatus(String orderId) throws OrderProcessingFailedException {
        throw new OrderProcessingFailedException();
    }
}
