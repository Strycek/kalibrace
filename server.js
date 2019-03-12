var http = require('http'); /*importuje knihovnu http server*/
var fs = require('fs'); /*knihovna fs/file soubor umozni mi pracovat se souborama*/


/*
 * url: localhost: 8080
 *
 * /kalibrace 
 * GET
 * - zadny param list - vraci pole []
 * - localhost:8080/kalibrace/5c535a3b74a735a4dd4f3d90 - vraci object {}
 *
 * 
 * DELETE
 *  - id
 *  - vraci OK
 * 
 * PUT - editace
 * - ID
 * - cislo
 * - zarizeni
 * - datum 
 * 
 *  - vraci OK
 * 
 * POST  - novy zaznam
 * - cislo
 * - zarizeni
 * - datum
 * 
 * - vraci ID
 * 
 * /zarizeni
 * GET
 * DELETE
 * PUT 
 * POST
 */


const server = http.createServer((request, response) => {
    // REST API
    switch (request.method) {
        case 'GET':

            parsedUrl = request.url.split('/')
            if (parsedUrl[1] == 'kalibrace') { // ma id
                json = JSON.parse(fs.readFileSync('data.json', 'utf8')); // Nacita data s data.json

                if (parsedUrl[2]) {
                    let id = request.url.split('/')[2]; // /kalibrace/5c535a3b74a735a4dd4f3d90 
                    selected = json.filter(item => id === item.id) /*OOP-lambda funkce (item => id === item.id) */
                    response.writeHead(200, { 'Content-Type': 'application/json' }); // HTTP status kod
                    response.write(JSON.stringify(selected.length > 0 ? selected[0] : {}));
                    // map, reduce, forEach, filter
                }
                else {// nema id
                    response.writeHead(200, { 'Content-Type': 'application/json' }); // HTTP status kod
                    response.write(JSON.stringify(json));
                }
            }
            else {
                response.writeHead(501);/*501 neni implementováno*/
            }
            response.end();
            break;
        case 'DELETE':
            parsedUrl = request.url.split('/')
            if (parsedUrl[1] == 'kalibrace') {
                json = JSON.parse(fs.readFileSync('data.json', 'utf8'));

                if (parsedUrl[2]) {
                    let id = request.url.split('/')[2]; // /kalibrace/5c535a3b74a735a4dd4f3d90 
                    let index;
                    json.forEach((item, i) => {
                        if (item.id == id) {
                            index = i
                        }
                    });
                    if (index) {
                        json.splice(index, 1);
                    }
                    response.writeHead(204); // HTTP status kod
                    fs.writeFileSync('data.json', JSON.stringify(json), 'utf8')
                }
                else { // nema id
                    response.writeHead(501);/*501 neni implementováno*/
                }
            }
            else {
                response.writeHead(501);/*501 neni implementováno*/
            }
            response.end();
            break;

        case 'POST': // create
            parsedUrl = request.url.split('/')
            if (parsedUrl[1] == 'kalibrace') {
                json = JSON.parse(fs.readFileSync('data.json', 'utf8'));

                let body = [];

                request.on('data', (chunk) => {
                    body.push(chunk);
                }).on('end', () => {
                    try {
                        parsedBody = JSON.parse(body);
                        parsedBody.id = Math.round(Math.random() * 1000000000).toString(34)

                        json.push(parsedBody);
                        fs.writeFileSync('data.json', JSON.stringify(json), 'utf8')

                        response.writeHead(200, { 'Content-Type': 'application/json' });
                        response.write(JSON.stringify(parsedBody));
                    }
                    catch(e){
                        console.log(e);
                        response.writeHead(400);
                    }
                    finally{response.end()}
                  });
            }

            break;
        case 'PUT': //update
            parsedUrl = request.url.split('/');
            if (parsedUrl[1] == 'kalibrace') {
                json = JSON.parse(fs.readFileSync('data.json', 'utf8'));
            }
            if (parsedUrl[2]) {
                let id = request.url.split('/')[2];


                response.writeHead(200, { 'Content-Type': 'application/json' });
            }

        case 'PATCH'://update
            //localhost:8080/kalibrace/5c535a3b2d31d27de231436d

            response.writeHead(501);/*501 neni implementováno*/
            response.end();
            break;
        default:
            response.writeHead(404);
            response.end();
    }

});
console.log('Posloucham')
server.listen(8080); /*podrží server neukončí se a čeká poslouchá*/



/*//nodejs.org/docs/latest-v9.x/api/*/



