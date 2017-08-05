var express = require('express');
var router = express.Router();
const http = require('http');
const options = require('./../Url/Url.js');
const querystring = require('querystring');

//根据类型发送不同数据
const regJson = /application\/json/,
      regFormUrlencoded = /application\/x-www-form-urlencoded/;

router.all('*',(req,res,next)=>{
  const optionsCopy = Object.assign({},options);
  optionsCopy.path += req.path.slice(1)+'?'+(req.url.split('?')[1]||'');
  optionsCopy.method = req.method;
  /*delete req.headers.host;
  delete req.headers.referer;*/
  optionsCopy.headers = req.headers;

  const serverReq = http.request(optionsCopy, serverRes=>{
    serverRes.setEncoding('utf8');
    let body = '';
    serverRes.on('data',chunk=>{
      body += chunk;
    });
    serverRes.on('end',()=>{

      writeHeader(res,serverRes.headers);

      res.end(body);
    });
  });

  serverReq.on("error",e=>{
    console.error(`请求遇到问题: ${e.message}`);
    res.sendStatus(500);
  });

  if(Object.keys(req.body).length){
    const contentType = req.headers['content-type'];
    if(regJson.test(contentType)){
      serverReq.write(JSON.stringify(req.body));
    }else if(regFormUrlencoded.test(contentType)){
      serverReq.write(querystring.stringify(req.body));
    }
  }
  serverReq.end();
});

function writeHeader(res,obj){
  for(let i in obj){
    if(obj.hasOwnProperty(i)){
      res.setHeader(i,obj[i]);
    }
  }
}


module.exports = router;
