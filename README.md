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
 To start the development server on localhost:4000 Type "npm start"


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
use you favourite REST client (e.g Postman, Insomnia) to test all routes

This is a simple app and no tough authentication requirements. However we need
to create a user to test protected enpoints. The following endpoint helps to achieve this.
Pass username and password to route

```
 localhost:4000/singup
```

```
sample request:
 {
	"email": "me@hackerbay.io",
	"password": "password"
 }
```



For user authentication after succesful user creation. this generate an authentication token
that will be used to validate request at protected endpoints

```
 localhost:4000/signin
```

```
sample request:
{
	"email": "me@hackerbay.io",
	"password": "password"
 }
```
```
sample response:
{
	"success": true,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc5OGVmMDcyZDAxNTE5ZGM3MGRmNmUiLCJlbWFpbCI6Im1lQG1lLmNvbSIsImlhdCI6MTUzNDczMjY5MSwiZXhwIjoxNTM0ODE5MDkxfQ.eEAXrix6QkuCKQwI5fu5_bUb0_9rwok6eJLUd2j1PbA"
}
```

The following route accepts a JSON object and a JSON patch object and returns a patched json object  ( see: (http://jsonpatch.com/))

```
localhost:4000/jsonpatch
```

```
sample request:

{
	"document": {
  "baz": "qux",
  "foo": "bar"
},
	"patch": [
  { "op": "replace", "path": "/baz", "value": "boo" },
  { "op": "add", "path": "/hello", "value": ["world"] },
  { "op": "remove", "path": "/foo" }
]
}
```

The final route request contains a public image URL, the picture is downloaded and resized and saved to a local folder.
a URL query is passed to route. The example uses the public image at https://www.google.com/images/srpr/logo3w.png

```
localhost:4000/thumbnail
```

```
sample request:
http://localhost:4000/thumbnail?url=https://www.google.com/images/srpr/logo3w.png
```

## Built With

* [Express](http://expressjs.com)
* [mongoose](https://mongoosejs.com)
* [mocha](https://mochajs.org)

## Docker

a working image of the application can be pulled from dockerhub

```
docker pull jidemobell/hackerbayservice
```
 
## Authors

* **Jide Olaniyan** 


