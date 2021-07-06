const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const fetch = require("node-fetch");

//the path is based on js folder
const curpath = path.resolve(__dirname);

/* 定義路由規則 */

//the path based on node.exe location in folder.
//for client download js/css/meta files.
app.use('/static', express.static(curpath+"/public"));


//Home page
app.get('/', function (req, res) {
  res.sendFile(curpath+'/index.html');
});

//get uni invoice data(xml format)
app.get('/api/getuniinvoice', async function(req, res){
	var uni_invoice_url = "https://invoice.etax.nat.gov.tw/invoice.xml";
	await fetch( uni_invoice_url, {
            method: 'GET'
        })
        .then(result => {
            //檢查是否抓取成功
            if (!result.ok) throw result;
            return result.text();
        })
        .then(data => {
            //抓取到的內容
            res.writeHead(200, {'Content-Type':'text/xml'});
			res.write(data);
			res.end();
        }).catch(error => {
            //抓取失敗
            console.log(error);
            console.log( uni_invoice_url+": error as above!!");
            res.writeHead(404, {'Content-Type':'text/plain'});
			res.end();
        });
});
/* 定義路由規則 - End */

/* 自定義函數 */

/* 自定義函數 - End */

/* 啟動伺服器 */
var httpserver = http.createServer(app);

//register listen event
httpserver.on("listening", function(){
	var addr = httpserver.address();
	var port = addr.port;
	console.log("Http Server listen on:"+port);
});

//start listen
httpserver.listen(3000);
/* 啟動伺服器 - End */




