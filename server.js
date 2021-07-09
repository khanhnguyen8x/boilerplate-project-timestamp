// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:datetime?", function (req, res) {
  var datetime = req.params.datetime;
  var date;
  if (datetime == undefined || datetime.length == 0) {
    date = new Date(Date.now());
  } else if (isNaN(datetime)) {
    // date string
    datetime = datetime.trim();
    date = new Date(datetime);
    if (!isValidDate(date)) {
      return res.status(400).send({ error: "Invalid Date" });
    }  
    console.log(date.toTimeString());
  } else {
    // date number
    date = new Date();
    date.setTime(datetime);
  }
  var unix = date.getTime();
  var utc = date.toUTCString();
  //console.log(unix);
  //console.log(utc);
  res.json(
    {
      unix: unix,
      utc: utc
    }
  );
});

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

// listen for requests :)
var listener = app.listen(50643, function () {
  console.log('Your app is listening on port ' + '50643');
});
