
const fs = require("fs");
const d3 = require("d3");
const fetch = require("node-fetch");
const topojson = require("topojson");
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html>`);

const drawMap = (data, input) => {
  const projection = d3.geoEquirectangular().scale(input.scale);
  const path = d3.geoPath().projection(projection);

  const svg = d3
    .select(dom.window.document.body)
    .append("svg")
    .attr("height", input.height)
    .attr("width", input.width);

  const countries = topojson.feature(data, data.objects.countries).features;
  svg
    .selectAll(".country")
    .data(countries)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("class", "country");  
};

const generateFile = (output) => {
  const body = dom.window.document.body;   
  fs.writeFile(output.fileName, body.innerHTML, (err) => {
    if (err) console.log(err);
  });
}

const draw = (params) => {
  fetch(params.input.urlMap)
    .then(res => res.json())
    .then((data) => drawMap(data, params.input))
    .then(() => generateFile(params.output))
    .catch(err => console.log(err));
}

module.exports = {
  draw
}