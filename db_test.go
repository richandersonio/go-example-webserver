package main

import (
	"testing"
)

func TestOpenDb(t *testing.T) {
	db, err := openDbConn()
	defer db.Close()
	if err != nil {
		t.Fatal(err)
	}

	db.Ping()
}

func TestReadGuestBook(t *testing.T) {
	//var book []GuestBookEntry
	_, err := ReadGuestBook()
	if err != nil {
		t.Fatal(err)
	}

}
func TestPostToGuestBook(t *testing.T) {
	err := postToGuestBook("hello world", "rich anderson", "richard@richandersonio.com")
	if err != nil {
		t.Fatal(err)
	}
}