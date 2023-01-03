var http = require('http');
var fs   = require('fs');
const { rawListeners } = require('process');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http
.createServer((req, res) =>{
const { url } = req
// switch(url){

//   case "/api":
//   res.writeHead(200,  { "Content-Type": "application/json" })
//   res.end(JSON.stringify(beatles));
//   break;

//   case "/api/John%20Lennon":
//   res.writeHead(200,  { "Content-Type": "application/json" })
//   res.end(JSON.stringify(beatles[0]));
//   break;

//   case "/api/Paul%20McCartney":
//     res.writeHead(200,  { "Content-Type": "application/json" })
//     res.end(JSON.stringify(beatles[1]));
//     break;
  
//   case "/api/George%20Harrison":
//     res.writeHead(200,  { "Content-Type": "application/json" })
//     res.end(JSON.stringify(beatles[2]));
//     break;
  
//   case "/api/Richard%20Starkey":
//     res.writeHead(200,  { "Content-Type": "application/json" })
//     res.end(JSON.stringify(beatles[3]));
//     break;
// } 

if(req.url === "/"){
  res.writeHead(200,  { "Content-type": "text/html" })
  const text = fs.readFileSync(`./index.html`, "utf-8");
  res.end(text);
}


const miUrl = req.url.split("/");
if(miUrl.length < 3) {
  const beatleName = miUrl[1].replace("%20", " ");
  const beatle = beatles.filter((elem) => elem.name === beatleName)[0];
  let template = fs.readFileSync("./beatle.html", "utf-8");

  template = template.replace("{name}", beatle.name);
  template = template.replace("{birthdate}", beatle.birthdate);
  template = template.replace("{image}", beatle.profilePic);
  res.writeHead(200, {"Content-type": "text/html"} ).end(template)
}
// revisar porque no me toma el name, pero el birthdate y la imagen si


if(req.url === "/api"){
  res.writeHead(200,  { "Content-type": "application/json" })
  res.end(JSON.stringify(beatles));
}


const beatlesName = req.url.split("/").pop().replace("%20", " ")

if(req.url.includes("/api") && beatlesName){
  const beatle = beatles.filter((elem) => elem.name === beatlesName)
  if(beatle.length === 0) return res.writeHead(404).end("Not Found") // busca el beatle que ingrese y no lo encuentra
  res.writeHead(200,  { "Content-type": "application/json" })
  res.end(JSON.stringify(beatle));
}



})


.listen(3001, "localhost")
