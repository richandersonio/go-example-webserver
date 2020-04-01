package main

import (
	"database/sql"
	"time"
	"errors"
)

// GuestBookEntry struct to json serialize the guestbook between the APIs and SQS
type GuestBookEntry struct {
	Message string `json:"message"`
	From    string `json:"from"`
	Email   string `json:"email"`
}

// open a connect to the MySQL database
func openDbConn() (db *sql.DB, err error) {
	db, err = sql.Open(
		"mysql",
		GetConfig().DatabaseConnection)
	if err != nil {
		return nil, err
	}

	return db, nil
}

// purpose: write a message to the guest book in mysql
// https://github.com/Go-SQL-Driver/MySQL/wiki/Examples

func postToGuestBook(message string, from string, email string) (err error) {
	if from == "error" {
		return errors.New("ok")
	}

	db, err := openDbConn()
	defer db.Close()

	// Prepare statement for inserting data
	stmtIns, err := db.Prepare("INSERT INTO guest_book(guest_book.message, guest_book.from, guest_book.email, guest_book.posted) VALUES( ?, ?, ?, ? )") // ? = placeholder
	if err != nil {
		return err
	}
	defer stmtIns.Close() // Close the statement when we leave main() / the program terminates

	_, err = stmtIns.Exec(message, from, email, time.Now())
	if err != nil {
		return err
	}
	return nil
}

func ReadGuestBook() (book []GuestBookEntry, errRet error) {
	var guestbook []GuestBookEntry

	db, err := openDbConn()
	if err != nil {
		return guestbook, err
	}
	defer db.Close()

	var rows *sql.Rows
	// Execute the query
	var dberr error
	rows, dberr = db.Query("SELECT guest_book.message, guest_book.from, guest_book.posted, guest_book.id FROM guest_book")
	if err != nil {
		return guestbook, err
	}

	// Fetch rows
	for rows.Next() {
		var message string
		var from string
		var posted []uint8
		var id int

		dberr = rows.Scan(&message, &from, &posted, &id)
		if dberr != nil {
			return guestbook, err
		}

		guestbook = append(guestbook, GuestBookEntry{Message: message, From: from})
	}
	return guestbook, nil
}
