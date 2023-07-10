package com.upgrad.patterns.Filters;

import com.upgrad.patterns.Authentication.Authenticator;
import com.upgrad.patterns.Middleware.AuthenticationProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StopWatch;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
public class AuthFilter implements Filter {
    private Logger logger = LoggerFactory.getLogger(AuthFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        logger.info(String.format("Incoming request for %s %s", httpRequest.getMethod(), httpRequest.getRequestURI()));
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        AuthenticationProcessor processor = Authenticator.GetAuthProcessor();
        boolean authorized = processor.isAuthorized(Authenticator.GetAuthProvider(httpRequest));

        if(authorized)
            chain.doFilter(request, response);
        else {
            logger.error("Authentication Failed");
            HttpServletResponse servletResponse = (HttpServletResponse) response;
            servletResponse.sendError(401, "Authentication headers missing");
        }

        stopWatch.stop();
        logger.info(String.format("%s %s completed in %s sec", httpRequest.getMethod(), httpRequest.getRequestURI(), stopWatch.getTotalTimeSeconds()));
    }
}
