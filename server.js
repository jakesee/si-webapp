const express = require("express");
const bodyParser = require('body-parser');
const compression = require('compression');
const { getAccountsbyContact, generateOTP, verifyOTP, validateWebView, testWebView, mockWebApp } = require('./server-api');
const config = require('./server-config.json');

const app = express();
const port = 4000; // default port to listen
const html = __dirname + '/build';
app
    .use(compression())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(express.static(html)) // Static content
    .post('/myfriend/web/home', validateWebView)
    .get('/myfriend/web/home/:accountId/:token/:benefitsBalance', testWebView)
    .get('/myfriend/', mockWebApp)
    // Start server
    .listen(config.port || port, function () {
        console.log(`myfriend web app running on port ${config.port || port} at location ${__dirname}`);
    });
