var express = require('express');
var app = express();
var port = process.env.PORT || 1337;
var siteUrl = "https://en.wikipedia.org/wiki/List_of_suicide_crisis_lines";
var axios = require("axios");
var cheerio = require("cheerio");

app.get('/', (request, response) => {
    response.status(200).json({serverup:true});
});

const fetchData = async () => {
    const result = await axios.get(siteUrl);
    return cheerio.load(result.data);
  };

app.get('/countries', async (request, response) => {
    const $ = await fetchData();
    var headerArray = [];
    $('table > tbody  > tr > th').each(function(index, th) {
        if(index == 0 || index == 1) { }
        else if($(this).text() == "vteSuicide") {
            return false;
        }
        else {
            headerArray.push($(this).text().replace(/\n/g, ""));
        }
    });
    response.status(200).json(headerArray);
});

app.get('/country', async (request, response) => {
    const $ = await fetchData();
    var obj = {};
    $('table > tbody  > tr > th').each(function(index, th) {
        if(index == 0 || index == 1) { }
        else if($(this).text().toLowerCase().includes(request.query.name.toLowerCase())) {
            obj["Phone numbers"] = $(this).next().text().replace(/\n/g, "").replace(/\s/g, "").match(/\d+/g); 
            obj["Websites"] = $(this).next().html().replace(/\n/g, "").match(/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig);
            obj["Text element"] = $(this).next().text().replace(/\n/g, "");
            obj["HTML element"] = $(this).next().html().replace(/\n/g, "");
        }
    });
    response.status(200).json(obj);
});
  
app.listen(port, () => {
    console.log('App listening at http://localhost:' + port)
});