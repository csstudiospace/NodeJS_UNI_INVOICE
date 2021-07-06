const fetch = require("node-fetch");

var uni_invoice_url = "https://invoice.etax.nat.gov.tw/invoice.xml";
    fetch( uni_invoice_url, {
        method: 'GET'
    })
    .then(result => {
        //檢查是否抓取成功
        if (!result.ok) throw result;
        return result.text();
    })
    .then(data => {
    	//顯示資料
        console.log(data);
    }).catch(error => {
        //抓取失敗
        console.log("抓取失敗");
    });

