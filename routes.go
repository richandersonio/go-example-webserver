package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	_ "github.com/go-sql-driver/mysql"
)

// http handlers
func setupRoutes() {

	// serve public files
	fs := http.FileServer(http.Dir("./public"))
	http.Handle("/", fs)

	// send back details about the host 
	http.HandleFunc("/whoareyou", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate, post-check=0, pre-check=0")
		hostname, _ := os.Hostname()
		fmt.Fprintf(w, "<h1>Who am I</h1>")
		fmt.Fprintf(w, "<h4>Hostname %s</h4>", hostname)
		fmt.Fprintf(w, "<h4>Pid %d</h4>", os.Getpid())
	})

	// A simple API that accepts a JSON request and echos back a response
	http.HandleFunc("/echo", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}

		type apiRequest struct {
			Message    string
		}

		type apiResponse struct {
			StatusCode int 
			Message   string
			ErrorMessage string 
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
		resp.Message = "Hello, your message was [" + req.Message +"]"
		e.Encode(resp)
	})
}
