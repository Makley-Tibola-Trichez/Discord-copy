package db

import (
	"database/sql"
	"os"
)

func ConnectDB() *sql.DB {
	databaseurl := os.Getenv("DATABASE_URL")

	pool, err := sql.Open("postgres", databaseurl)

	if err != nil {
		panic(err)
	}

	return pool
}
