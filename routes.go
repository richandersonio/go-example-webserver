package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

// array to keep all of the echo messages sent to the server

var echoMessages []string

// http handlers
func setupRoutes() {

	// serve public files
	fs := http.FileServer(http.Dir("./public"))
	http.Handle("/", fs)

	// whoareyou api - send back some basic info about the host and process
	http.HandleFunc("/whoareyou", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate, post-check=0, pre-check=0")
		hostname, _ := os.Hostname()
		fmt.Fprintf(w, "<h1>Who am I...</h1>")
		fmt.Fprintf(w, "<h4>Hostname %s</h4>", hostname)
		fmt.Fprintf(w, "<h4>Pid %d</h4>", os.Getpid())
	})

	// greeting api
	http.HandleFunc("/greeting", func(w http.ResponseWriter, r *http.Request) {
		type apiResponse struct {
			Greeting string
		}

		var resp apiResponse
		resp.Greeting = GetConfig().Greeting
		var e = json.NewEncoder(w)
		e.Encode(resp)
	})

	// echo api - accepts a JSON request and echos back a response
	http.HandleFunc("/echo", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}

		type apiRequest struct {
			Message string
		}

		type apiResponse struct {
			StatusCode       int
			Message          string
			ErrorMessage     string
			PreviousMessages []string
		}

		var req apiRequest
		decoder := json.NewDecoder(r.Body)
		decoder.Decode(&req)

		var resp apiResponse
		var e = json.NewEncoder(w)

		if req.Message == "" {
			resp.StatusCode = 1
			resp.ErrorMessage = "Message is a required field"
			e.Encode(resp)
			return
		}

		resp.StatusCode = 0
		resp.Message = "Hello, your message was [" + req.Message + "]"
		GetConfig().Greeting = req.Message

		echoMessages = append(echoMessages, resp.Message)
		resp.PreviousMessages = echoMessages // send all of the previous messages the server has

		e.Encode(resp)
	})
}
