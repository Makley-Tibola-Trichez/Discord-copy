package controllers

import (
	"discord-server/models"
	"discord-server/repository"

	"github.com/labstack/echo/v4"
)

// handlefunc
func RegisterUser(e echo.Context) error {
	var body models.RegisterUser

	e.Bind(&body)

	if body.Username == "" {
		return e.String(400, "Username is required")
	} else if len(body.Username) < 2 {
		return e.String(400, "Username must be at least 2 characters")
	}

	if body.Name == "" {
		return e.String(400, "Name is required")
	} else if len(body.Name) < 2 {
		return e.String(400, "Name must be at least 2 characters")
	}

	if body.Email == "" {
		return e.String(400, "Email is required")
	}

	if body.Password == "" {
		return e.String(400, "Password is required")
	} else if len(body.Password) < 8 {
		return e.String(400, "Password must be at least 8 characters")
	}

	err := repository.CreateUser(&body)

	if err != nil {
		e.Logger().Error(err)
		return e.String(500, "Internal Server Error")
	}

	return e.NoContent(204)
}
