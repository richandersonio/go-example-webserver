package main

import (
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	// by default just log to stdout, but check for for an environment variable to enable a log file
	if os.Getenv("LOGTOFILE") == "yes" {
		// create a log file
		f, _ := os.Create("webserver.log")
		defer f.Close()
		log.SetOutput(f)
	}

	// include date & time with each log entry
	log.SetFlags(log.Ldate | log.Ltime | log.Lmicroseconds)

	// Say hello and start up the http listener
	hostname, _ := os.Hostname()
	log.Printf("web server starting on host [%s]:[%s]\n", hostname, GetConfig().Port)
	setupRoutes()
	go startHTTPListener()     // handle http requests

	// wait for kill signal 
	exitChan := setupSigtermHandler()
	code := <-exitChan

	os.Exit(code)
}

// called to start accepting http connections/requests
func startHTTPListener() {
	http.ListenAndServe(":"+GetConfig().Port, nil)
}

// called when the web server is ending by the signal handler.  
func serverEnding() {
	hostname, _ := os.Hostname()
	log.Printf("web server ending on host [%s]:[%s]", hostname, GetConfig().Port)
}


// catch common signals to and allow exit processing
func setupSigtermHandler() chan int {
	signalChan := make(chan os.Signal, 1)
	signal.Notify(signalChan,
		syscall.SIGTSTP,
		syscall.SIGTERM,
		syscall.SIGINT,
		syscall.SIGQUIT)
	exitChan := make(chan int)
	go func() {
		for {
			s := <-signalChan
			switch s {
			case syscall.SIGINT:
				log.Println("signal received: SIGINT")
				serverEnding()  // cmd-c on mac
				exitChan <- 0

			// called when a systemd service is stopped "systemctl stop myservice"
			case syscall.SIGTERM:
				log.Println("signal received: SIGTERM")
				serverEnding()
				exitChan <- 0

			case syscall.SIGTSTP:
				log.Println("signal received: SIGTSTP")
				serverEnding()
				exitChan <- 0

			case syscall.SIGQUIT:
				log.Println("signal received: SIGQUIT")
				serverEnding()
				exitChan <- 0
				
			default:
				log.Println("signal received: Unknown signal")
				serverEnding()
				exitChan <- 1
			}
		}
	}()

	return exitChan
}