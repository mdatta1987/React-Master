package com.upgrad.paymentservice.controller;

import com.upgrad.paymentservice.model.PaymentResponseVO;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

import static com.upgrad.paymentservice.constants.PaymentConstants.PAYMENT_SUCCESS;

@RestController
@Log4j2
public class PaymentServiceController {

    @GetMapping("/v1/payments/status")
    public ResponseEntity<PaymentResponseVO> getPaymentStatus(@RequestParam String orderId) throws InterruptedException {
        log.info("Payment Status for Order Id "+orderId);
        //Thread.sleep(2000);
        return ResponseEntity.ok(PaymentResponseVO.builder()
                .orderId(orderId)
                .paymentStatus(PAYMENT_SUCCESS)
                .paymentReferenceNumber(UUID.randomUUID().toString())//mocking the response
                .build());
    }
}
