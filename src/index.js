
const fs = require("fs");
const d3 = require("d3");
const fetch = require("node-fetch");
const topojson = require("topojson");
const jsdom = require("jsdom");

const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html>`);

const input = {
  height: 800,
  width: 1200,
  scale: 200,
  urlMap: "https://unpkg.com/world-atlas@1/world/110m.json"
}

const output = {
  fileName: "map.html"
}

const projection = d3.geoEquirectangular().scale(input.scale);
const path = d3.geoPath().projection(projection);

const map = d3
  .select(dom.window.document.body)
  .append("svg")
  .attr("height", input.height)
  .attr("width", input.width);

const drawMap = (data) => {
  const countries = topojson.feature(data, data.objects.countries).features;
  map
    .selectAll(".country")
    .data(countries)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("class", "country");

  const body = dom.window.document.body;
  fs.writeFile(output.fileName, body.innerHTML, (err) => {
    if (err) console.log(err);
  });
};

const draw = () => {
  fetch(input.urlMap)
    .then(res => res.json())
    .then(drawMap)
    .catch(err => console.log(err));
}

module.exports = {
  draw,
  input,
  output
}