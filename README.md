#  http-errors-middleware
Simple custom HTTP error handler middleware for REST APIS built on express framework.
We recommend the usage of [http-errors](https://github.com/jshttp/http-errors) module, but this module should work properly with other custom errors as well. 

## Installation

```
npm install http-errors-middleware
```

## Usage

The middleware can receive an option object as parameter.

Options:

- debug: Boolean value, defaults to `false`. if true, it'll log the error no terminal before send the response back. 

**Example of usage with an express app:**

```javascript
const createError = require('http-errors');
const errorHandler = require('http-errors-middleware');

app.get('/error', (req, res, next) => {
    return next(createError(404, "You shouldn't hit this route"));
});

app.use(errorHandler({ debug: true }));

```
It'll send back a json to the client: 

```
HTTP/1.1 404 Not Found
{
    "error": {
        "title": "Not Found",
        "Name": "NotFoundError",
        "message": "You shouldn't hit this route"
    }
}
```
**Example of usage with an express route and a mongoose query using promises:**
```javascript
app.put('/user/:id/interests', (req, res, next) => {
  User.update({ _id: req.params.id }, { $pushAll: { interests: req.body }})
    .then((result) => {
      if (result.ok === 1) {
        return res.json({ success: true });
      }
      createError(500, "Couldn't add those interests");
   })
  .catch(next);
})

app.use(errorHandler);
```

It might output for example something like this: 

```
HTTP/1.1 500 Internal Server Error
{
    "error": {
        "title": "Internal Server Error",
        "name": "ClosedConnection",
        "message": "Couldn't add those interests"
    }
}
```
