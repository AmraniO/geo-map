# Geo-Map

Geo-Map is a JavaScript library based on D3.JS. The map file is generated to HTML file on server side using Node.JS

## Installation?

```
npm i @amranio/geo-map
```

## How to use it?

```
const map = require("@amranio/geo-map");

const input = {
  height: 900,
  width: 1200,
  scale: 300,
  urlMap: "https://unpkg.com/world-atlas@1/world/110m.json"
};
  
const output = {
  fileName: "map.html"
};

map.draw({ input, output });
```