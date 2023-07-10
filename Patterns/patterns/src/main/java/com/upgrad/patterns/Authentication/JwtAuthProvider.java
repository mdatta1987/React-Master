package com.upgrad.patterns.Authentication;

public class JwtAuthProvider extends AuthenticationProvider {
    private String token;
    public JwtAuthProvider(String token)
    {
        this.token = token;
    }
    @Override
    public boolean Authenticate() {
        return "Bearer upgrad".equals(token);
    }
}
