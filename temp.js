'use strict';
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const express = require('express');
const d3 = require('d3');
const jsdom = require('jsdom-no-contextify').jsdom;
const app = express();
const { JSDOM } = jsdom;

let db;

function svgDOM(width, height) {
    // Setup DOM
    const document = jsdom();
    const body = d3.select(document.body);

    //create svg node
    return body.append('svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
        .attr('width', width)
        .attr('height', height);
}

//function getDoc() {
    //const doc = jsdom('<!DOCTYPE html><html><head><title>D3 : Animated Bar Chart</title><script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script><style type="text/css">#chartarea {height: 400px;width: 600px;border: 1px solid black;}</style></head><body><svg id="chartarea"></svg></body></html>', {});
    //return doc;
//}

//function getDoc() {
    //const doc = jsdom('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Ordinal Scales</title><style>body {font: 10px sans-serif;}h2 {margin-top: 0;color: grey;}div {height: 50px;font-size: x-large;text-align: right;color: white;padding: 10px;</style></head><body></body></html>', {});
    //return doc;
//}
function getDoc() {
    const doc = jsdom('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Ordinal Scales</title><style>body {font: 10px sans-serif;}h2 {margin-top: 0;color: grey;}div {height: 50px;font-size: x-large;text-align: right;color: blue;padding: 10px;</style></head><body><div>THIS IS SOME STUFF</div></body></html>', {});
    return doc;
}

//function d3Draw() {
    //const π = Math.PI,
          //τ = 2 * π,
          //n = 500;

    //const width = 960,
          //height = 960,
          //outerRadius = width / 2 - 20,
          //innerRadius = outerRadius - 80;

    //const svg = svgDOM(width, height);
    //svg
        //.append("g")
        //.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        //.selectAll("path")
        //.data(d3.range(0, τ, τ / n))
        //.enter().append("path")
        //.attr("d", d3.arc()
                //.outerRadius(outerRadius)
                //.innerRadius(innerRadius)
                //.startAngle(function(d) { return d; })
                //.endAngle(function(d) { return d + τ / n * 1.1; }))
        //.style("fill", function(d) { return d3.hsl(d * 360 / τ, 1, .5); });

    ////d3.select(self.frameElement).style("height", height + "px");

    //return svg.node().outerHTML;
//}

function d3StaticBGraph() {
  const data = ["I", "II", "III"];
  const nameScale = d3.scaleOrdinal()
    .domain(data)
    .range(["Jan", "Feb", "Mar"]);
  const widthScale = d3.scaleOrdinal()
    .domain(data)
    .range([300, 100, 900]);
  const doc = getDoc();
  const d3doc = d3.select(doc);

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  //d3doc.select("body")
    //.selectAll("div")
    //.data(data)
    //.enter()
    //.append("div")
    //.text(nameScale)
    //.style("width", d => widthScale(d) + "px")
    //.style("background-color", color);

  d3doc.select("body").transition().delay(200).style("background-color", "green");

  //console.warn(`DOC: ${require('util').inspect(d3doc.select("html").node().outerHTML.outerHTML)}`);;
  //return d3doc.node().outerHTML;
  return d3doc.select("html").node().outerHTML;
} 

//function d3BarGraph() {
    //const data = d3.range(256).map(function () {
			//return Math.random();
    //});
    //const doc = getDoc();
    //var height = 400;
    //var width = 600;
    //var barPadding = 2;
    //var barWidth = (width / data.length) - barPadding;

    //var yScale = d3.scaleLinear()
        //.domain([0, d3.max(data)])
        //.range([0, height]);

    //var xScale = d3.scaleOrdinal()
        //.domain(data)
        //.range([0, width], 0.1, 0.3);

    //const d3doc = d3.select(doc);
    ////const d3win = d3.select(body);
	//var svg = d3doc.select("#chartarea");
		////.style('width', width + 'px')
		////.style('height', height + 'px');

	//svg.selectAll('rect')
		//.data(data)
		//.enter()
		//.append('rect')
		//.attr('class', 'bar')
		//.attr("x", function (d, i) {
			//return xScale(d);
		//})
		//.attr("y", function (d, i) {
			//return height;
		//})
		//.attr("width", function (d, i) {
			//return xScale.range()
		//})
		//.attr("fill", function (d, i) {
			//return 'rgb(256, ' + Math.round(i / 2) + ', ' + i + ')'
		//})
		//.attr("height", 100)
		////.transition()
		////.duration(200)
		////.delay(function (d, i) {
			////return i * 50;
		////})
		//.attr("y", function (d, i) {
			//return height - yScale(d);
		//})
		//.attr("height", function (d, i) {
			//return yScale(d);
        //});
    ////console.warn(`DOC: ${require('util').inspect(svg.select(function() { return this.parentNode.parentNode;}).node().outerHTML)}`);
    //return svg.select(function() { return this.parentNode.parentNode;}).node().outerHTML
//};
app.use('/assets', express.static(`${__dirname}/public`));

app.get('*', (req, res) => {
    //if (db) {
        //db.collection('electric_analytics').find({}).toArray((err, results) => {
            //if (err) return console.warn(err);
            //res.send(results);
        //});
    //} else {
        //console.warn(`NO DB DB DB!!!`);
        //}
    //res.writeHead(200, { "Content-Type": 'image/svg+xml' });
    res.writeHead(200, { "Content-Type": 'text/html' });
    //res.end(d3Draw());
    //d3Draw();
    //res.end(d3BarGraph());
    res.end(d3StaticBGraph());
    //res.end(getDoc());
});

MongoClient.connect('mongodb://172.18.0.2:27017', (err, client) => {
    if (err) return console.log(err)
    db = client.db('test') // whatever your database name is
    app.listen(3000, () => {
        console.warn('listening on 3000')
    });
});

//const port = process.env.PORT || 3000;
//app.listen(port);
