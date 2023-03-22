const fs = require("fs");
const path = require("path");
const countriesJson = require("./countries.json");

const router = (req, res) => {
  let endpoin = req.url;
  if (endpoin === "/") {
    let filePath = path.join(__dirname, "..", "public", "index.html");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>Server Error</h1>");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (endpoin === "/styles.css") {
    let filePath = path.join(__dirname, "..", "public", "styles.css");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>Server Error</h1>");
      }
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
  } else if (endpoin === "/app.js") {
    let filePath = path.join(__dirname, "..", "public", "app.js");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>Server Error</h1>");
      }
      res.writeHead(200, { "Content-Type": "text/js" });
      res.end(data);
    });
  } else if (endpoin.includes("/countries")) {
    let value = endpoin.split("/countries/")[1].toLowerCase();
    let filterdCountries = countriesJson.filter((country) =>
      country.toLowerCase().includes(value)
    );
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(filterdCountries));
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Page Not Found</h1>");
  }
};

module.exports = router;
