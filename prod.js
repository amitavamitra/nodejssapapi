const express               = require('express');
const ejs                   = require('ejs');
const app                   = express();
const bodyParser            = require('body-parser');
const dotenv                = require('dotenv').config();
// using node-fetch api.
const fetch                 = require('node-fetch');
app.use(express.static('public'));
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.get('/', function(req,res){
    res.render('home', {prodArr:prodArr})
})

const headers = {
  "Content-Type": "application/json",
  "Apikey": process.env.APIKEY,
  "Accept": "application/json",
  "DataServiceVersion": "2.0"
}
// const data = {
//   "name": "AMit",
//   "occupation": "Scientist",
//   "age": "12 (forever)"
// }

const body = {

};

var productdetails = "";
var metadata = "";
var prodArr = [];
app.post('/', function(req,res){

    var product = String(req.body.product);
    var aproduct = "A_Product('" + product + "'" + ")";
// const url ="https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product('21')";
const s4cal  = 'http://10.79.14.227:44300/sap/opu/odata/sap/API_PRODUCT_SRV/';
// const url = "https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_PRODUCT_SRV/" + aproduct;

const url = s4cal + aproduct;

const urlA = "https//10.79.14.227:50000/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product"

console.log(urlA);
    fetch(urlA, { method: 'GET', headers: headers})
    .then((res) => {
       return res.json()
  })
  .then((json) => {
     // Do something with the returned data.
     console.log(json);
    productdetails = JSON.stringify(json);
// https://stackoverflow.com/questions/39094162/parsing-nested-json-in-nodejs/39094247
var obj = JSON.parse(productdetails);
var keysArray = Object.keys(obj);
for (var i = 0; i < keysArray.length; i++) {
   var key = keysArray[i]; // here is "name" of object property
   var value = obj[key]; // here get value "by name" as it expected with objects
   prodArr.push(key);
   prodArr.push(value);
   console.log(key,value);
}
  });
   
})
app.listen(3000, ()=>{console.log('Product read api running at port 3000')});


