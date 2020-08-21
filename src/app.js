const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");


console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "Akmalhakimteo",
    author: "Akmalhakimteo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    name: "Akmalhakimteo",
    author: "Akmalhakimteo",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    topic: "help me",
    name: "Akmalhakimteo",
    author: "Akmalhakimteo",
  });
});

app.get("/weather", (req, res) => {
  var address = req.query.address;
  if (!address) {
    return res.send({
      error: "Address must be provided",
    });
  }

  geocode(address, (error, { lat, long, location } = {} ) => {
    if (error) {
      return res.send({error})
    }
    // console.log("new");
    // console.log(lat, long, location);

    forecast(lat, long, (err, forecastData) => {
      if (err) {
        return res.send({err})
      }

      res.send({
        location,
        forecast: forecastData,
        address
      });
    });
  });

});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    author: "Akmalhakimteo",
    errorMsg: "404 Page not found lah",
  });
});

app.listen(port, () => {
  console.log("Listening on port ",port);
});
