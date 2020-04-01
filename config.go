package main

import ( 
	"os"
)

type AppConfig struct {
	Port string // port to connect to the web server 
	DatabaseConnection string // mysql connection string 
	Greeting string // msg to use in the title of the page
	ClientConfig map[string]string
}

var config *AppConfig // singleton 

func GetConfig() (*AppConfig) {
	if config == nil {
		config = createDefaultConfig()
	}
	return config
}

func createDefaultConfig() (*AppConfig) {
	var cfg *AppConfig
	
	cfg = &AppConfig { 
		DatabaseConnection: getDatabaseConnectionString(),
		Port: getPort(),
		Greeting: "Greetings!",
		ClientConfig: make(map[string]string),
	}

	return cfg
}

// Get the port to listen on, checking for an environment variable override
func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	return port
}

// Get the DBCONN to listen on, checking for an environment variable override
func getDatabaseConnectionString() string  {
	dbconn := os.Getenv("DBCONN")
	if dbconn == "" {
		dbconn = "gowebserver:password@tcp(localhost:3306)/gowebserverexample"
	}
	return dbconn
}