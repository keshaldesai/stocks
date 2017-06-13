# README #

Boilerplate server that uses Google OAuth 2.0 to authenticate user. Provides a token to client-side application.

# Setup #

Requires config folder with three config files setup in this way:

config/

authConfig.json: {
	"clientID": "",
	"clientSecret": "",
	"callbackURL": ""
}

jwtConfig.json: {
	"secret": ""
}

mongoConfig.json {
	"user": "",
	"pass": ""
}