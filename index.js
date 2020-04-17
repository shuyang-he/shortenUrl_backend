// Set express server.
const express = require("express");
const bodyParser = require("body-parser");
const PORT = 8000;
const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,x-access-token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Set MongoDB.
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/url-shortner";
const connectOptions = { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}; 

// Set routes.
const urlShorten = require("./routes/urlshorten");
app.use('/', urlShorten);

// Connect to MongoDB. 
mongoose
.connect(mongoURI, connectOptions, (err, db) => { 
  if (err) {
    throw err; 
  }
  console.log('Connect to MongoDB');
})
.then((res) => {
  // Connect to Express server.
  return app.listen(PORT, () => {
    console.log(`Server started on port`, PORT);
  });
})
.catch((err) => {
  console.log(err);
}); 
