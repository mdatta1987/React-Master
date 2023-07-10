package com.upgrad.patterns.Authentication;

public class BasicAuthProvider extends AuthenticationProvider {
    private String userName;
    private String password;

    public BasicAuthProvider(String userName, String password) {
        this.userName = "India";
        this.password = "India";
    }

    @Override
    public boolean Authenticate() {
        return "India".equals(userName) && "India".equals(password);
    }
}
