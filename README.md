# Hackerbay microservice

a simple stateless microservice in Nodejs, with three major functionalities -

* Authentication
* JSON patching
* Image Thumbnail 

npm install to ensure same packages are installed.
To start the development server on localhost:3000 Type "npm start"

### Prerequisites

 it is required that you have node,npm and mongodb installed to successfully test this project 

 npm install to ensure same packages are installed.
 To start the development server on localhost:3000 Type "npm start"


### Installing


clone the repo  

```
git clone https://github.com/jidemobell/hackerbay-backend.git
```

navigate into the root app folder and 

```
npm install
```

to run application

```
npm start
```

## Running the tests

The app uses mocha/chai for testing

```
npm test
```

### tesing endpoints
use you favourite REST client (e.g Postman, Insomnia) to test all enpoints

This is a simple app and no tough authentication requirements. However we need
to create a user to test the enpoints. The following endpoint helps to achieve this.
Pass username and password to route

```
sample request:
 {
	"email": "me@hackerbay.io",
	"password": "password"
 }
```

```
 localhost:3000/singup
```

For user authentication after succesful user creation 


<!-- 
### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system -->

## Built With

* [Express](http://expressjs.com)
* [mongoose](https://mongoosejs.com)
* [mocha](https://mochajs.org)
 
## Authors

* **Jide Olaniyan** 


