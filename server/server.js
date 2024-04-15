const express = require("express");
const cors = require("cors");
var session = require('express-session')

var dbConn = require("./config/db.config.js");

const app = express();

app.use(cors());
 

// parse requests of content-type - application/json
app.use(express.json({ limit: '10mb' }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(session({secret: 'secret', resave: 'false', saveUninitialized: 'false'}))

app.get("/", (req, res) => {
  dbConn.query("SELECT 1", function (err, ressponse) {
    if (err) {
      res.send({ status: "Failed", error: err });
    } else {
      res.send({ status: "OK" });

    }
  });
});

const routes = require("./routes/data.route.js");
app.use("/api",routes);



const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


