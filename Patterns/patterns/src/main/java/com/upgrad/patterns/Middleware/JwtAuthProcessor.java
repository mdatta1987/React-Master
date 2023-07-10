package com.upgrad.patterns.Middleware;

import com.upgrad.patterns.Authentication.AuthenticationProvider;
import com.upgrad.patterns.Authentication.JwtAuthProvider;

public class JwtAuthProcessor extends AuthenticationProcessor {
    public JwtAuthProcessor(AuthenticationProcessor processor)
    {
        super(processor);
    }

    //if JWT token is provided, use it to authenticate
    @Override
    public boolean isAuthorized(AuthenticationProvider provider) {
        if(provider instanceof JwtAuthProvider) {
            return provider.Authenticate();
        } else if(nextProcessor != null) {
            return nextProcessor.isAuthorized(provider);
        }

        return false;
    }
}
