# express-status-message-error
Simple custom Error prototype and Error handling middleware for REST APIS built on express framework. 

## Installation

```
npm install express-status-message-error
```

## Usage

This module offers basically a custom error prototype and a error handler middleware to be used together the NodeJS express framework.

### CustomError

This Error prototype can be thrown as a normal JS built-in Error, whereas it inherits its prototype chain. 

**Parameters** :

- `status`: A http status code to be returned. By default, it assumes a `500` status code. 
- `message`: A message text to be returned to the user. By default it assumes `An error occured`. 
- `opts`: An Object to allow some kind of customization in a near future. By now, it's useless, we thought it'd be a good idea to place it here just for API-defining purposes, though. Feel free to implement something useful here. (:

Example: 

```javascript
const {CustomError} = require('express-status-message-error');

throw new CustomError(401, "User not found!");

// or

throw new CustomError(412, "Filter field must be defined");
```
 
## errorHandler

A simple middleware to handle errors. 

- Example of usage with an express app: 

```javascript
const {CustomError , errorHandler} = require('express-status-message-error');

app.get('/error', (req, res, next) => {
    return next(new CustomError(404, "You shouldn't hit this route"))
});

app.use(errorHandler)
```
It'll send back a json to the client: 

```
HTTP/1.1 404 Not Found
{
    "error": {
        "title": "Not Found",
        "message": "You shouldn't hit this route"
    }
}
```

- Example of usage with an express route and a mongoose query using promises:
```javascript

app.put('/user/:id/interests', (req, res, next) => {
  User.update({ _id: req.params.id }, { $pushAll: { interests: req.body }})
    .then((result) => {
      if (result.nModified === 1) {
        return res.json({ success: true });
      }
      throw new RankError(500, "Couldn't add those interests");
   })
  .catch(next);
})

app.use(errorHandler);
```

It'll output: 

```
HTTP/1.1 500 Internal Server Error
{
    "error": {
        "title": "Internal Server Error",
        "message": "Couldn't add those interests"
    }
}
```
