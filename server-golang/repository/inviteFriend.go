package repository

import (
	"discord-server/db"
	"fmt"
)

func InviteFriend(friendID *int, userID *uint) error {

	pool := db.ConnectDB()
	defer pool.Close()

	fmt.Println(*userID, *friendID, *userID)

	_, err := pool.Exec(`
		INSERT INTO public.dsc_friendship 
		(user_id, friend_id, inviter_id)
		VALUES ($1, $2, $3)
	`, userID, friendID, userID)

	if err != nil {
		return err
	}

	return nil
}
