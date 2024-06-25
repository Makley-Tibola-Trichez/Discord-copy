package repository

import (
	"discord-server/db"
	"discord-server/models"
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func Login(user *models.Login) (uint, error) {

	pool := db.ConnectDB()

	defer pool.Close()

	var password string
	var id uint

	result := pool.QueryRow(`SELECT user_id, password FROM public.dsc_user WHERE email = $1`, user.Email)

	err := result.Scan(&id, &password)

	if err != nil {
		fmt.Println(err)
	}

	validPassword := bcrypt.CompareHashAndPassword(
		[]byte(password),
		[]byte(user.Password),
	)

	return id, validPassword

}
