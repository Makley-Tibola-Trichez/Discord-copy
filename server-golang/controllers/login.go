package controllers

import (
	"discord-server/models"
	"discord-server/repository"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

func Login(e echo.Context) error {

	var body models.Login

	e.Bind(&body)

	if body.Email == "" {
		e.String(400, "Email is required")
		return nil
	}

	if body.Password == "" {
		e.String(400, "Password is required")
		return nil

	}

	user_id, err := repository.Login(&body)

	if err != nil {
		e.String(400, "Invalid email or password")
		return nil

	}

	var (
		key           string
		token         *jwt.Token
		tokenAssigned string
	)

	key = os.Getenv("SECRET_KEY")

	claims := &models.TokenClaims{
		UserID: user_id,
		Email:  body.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 60)),
		},
	}

	token = jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenAssigned, err = token.SignedString([]byte(key))

	if err != nil {
		e.Logger().Error(err)
		e.String(500, "Internal Server Error")
		return err
	}

	e.JSON(200, map[string]string{
		"token": tokenAssigned,
	})
	return nil
}
