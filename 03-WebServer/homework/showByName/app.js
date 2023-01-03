var fs = require("fs")
var http = require("http")

// Escribí acá tu servidor
http
  .createServer((req, res) => {
    const { url } = req;

    switch (url) {
      case "/arcoiris_doge":
        res.writeHead(200, { "Content-Type": "image/jpeg" })
        const img = fs.readFileSync(__dirname + `/images/arcoiris_doge.jpg`);
        res.end(img);
        break;

      case "/badboy_doge":
        res.writeHead(200, { "Content-Type": "image/jpeg" })
        const img2 = fs.readFileSync(__dirname + `/images/badboy_doge.jpg`);
        res.end(img2);
        break;

      case "/code_doge":
        res.writeHead(200, { "Content-Type": "image/jpeg" })
        const img3 = fs.readFileSync(__dirname + `/images/code_doge.jpg`);
        res.end(img3);
        break;

      case "/resaca_doge":
          res.writeHead(200, { "Content-Type": "image/jpeg" })
          const img4 = fs.readFileSync(__dirname + `/images/resaca_doge.jpg`);
          res.end(img4);
          break;
      
      case "/retrato_doge":
          res.writeHead(200, { "Content-Type": "image/jpeg" })
          const img5 = fs.readFileSync(__dirname + `/images/retrato_doge.jpg`);
          res.end(img5);
          break;
      
      case "/sexy_doge":
          res.writeHead(200, { "Content-Type": "image/jpeg" })
          const img6 = fs.readFileSync(__dirname + `/images/sexy_doge.jpg`);
          res.end(img6);
          break;
    
      default:
        res.writeHead(404); 
		    res.end("404 Not Found"); 


    }
  })
  .listen(3001, "127.0.0.1");


