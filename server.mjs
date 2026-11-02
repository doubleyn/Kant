import http from 'node:http';import fs from 'node:fs/promises';
const file=new URL('./index.html',import.meta.url);
http.createServer(async(req,res)=>{try{res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(await fs.readFile(file))}catch{res.writeHead(500);res.end('Run node build.mjs first')}}).listen(4188,'127.0.0.1',()=>console.log('http://127.0.0.1:4188'));
