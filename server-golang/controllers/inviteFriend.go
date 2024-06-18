package controllers

import (
	"discord-server/models"
	"discord-server/repository"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

func InviteFriend(c echo.Context) error {
	var friendID int

	binder := echo.PathParamsBinder(c)
	binder.Int("friendID", &friendID)

	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*models.TokenClaims)

	err := repository.InviteFriend(&friendID, &claims.UserID)

	if err != nil {
		c.Logger().Error(err)
		return echo.ErrBadGateway
	}

	return c.NoContent(204)
}
