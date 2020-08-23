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
            headerArray.push($(this).text().replace("\n",""));
        }
    });
    response.status(200).json(headerArray);
});
  
app.listen(port, () => {
    console.log('App listening at http://localhost:' + port)
});