package models

import "github.com/golang-jwt/jwt/v5"

type TokenClaims struct {
	UserID uint   `json:"userID"`
	Email  string `json:"email"`
	jwt.RegisteredClaims
}
