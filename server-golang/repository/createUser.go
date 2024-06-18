package repository

import (
	"discord-server/db"
	"discord-server/models"

	"golang.org/x/crypto/bcrypt"
)

func CreateUser(user *models.RegisterUser) error {

	pool := db.ConnectDB()

	defer pool.Close()

	passwordHashed, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)

	if err != nil {
		return err
	}

	user.Password = string(passwordHashed)

	result, err := pool.Prepare(`
		INSERT INTO public.dsc_user (username, name, email, password)
		VALUES ($1, $2, $3, $4)
	`)

	if err != nil {
		return err
	}

	_, err = result.Exec(user.Username, user.Name, user.Email, user.Password)

	return err
}
