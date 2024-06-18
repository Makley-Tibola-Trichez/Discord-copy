package main

import (
	"discord-server/controllers"
	"discord-server/models"
	"os"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
)

func main() {
	e := echo.New()
	err := godotenv.Load()

	if err != nil {
		e.Logger.Fatal("Error loading .env file")
	}

	if err != nil {
		e.Logger.Fatal(err)
	}

	e.POST("/api/auth/login", controllers.Login)
	e.POST("/api/auth/register", controllers.RegisterUser)

	r := e.Group("/api")

	config := echojwt.Config{
		NewClaimsFunc: func(c echo.Context) jwt.Claims {
			return new(models.TokenClaims)
		},
		SigningKey: []byte(os.Getenv("SECRET_KEY")),
	}

	r.Use(echojwt.WithConfig(config))

	r.POST("/invite/:friendID", controllers.InviteFriend)

	// r.POST("/auth/loginn", func(c echo.Context) error {
	// 	return c.String(200, "You are logged in")
	// })

	e.Logger.Fatal(e.Start(":8080"))

}
