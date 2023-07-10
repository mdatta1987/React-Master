package com.upgrad.patterns.Middleware;

import com.upgrad.patterns.Authentication.AuthenticationProvider;

public abstract class AuthenticationProcessor {
    public AuthenticationProcessor nextProcessor;
    public AuthenticationProcessor(AuthenticationProcessor nextProcessor)
    {
        this.nextProcessor = nextProcessor;
    }
    public abstract boolean isAuthorized(AuthenticationProvider provider);
}
