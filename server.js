var http = require('http'); /*importuje knihovnu http server*/
var fs = require('fs'); /*knihovna fs/file soubor umo6n9 mi pracovat se souboxrama*/


/*
 * url: localhost: 8080
 *
 * /kalibrace 
 * GET
 * - zadny param list - vraci pole []
 * - localhost:8080/kalibrace/123 - vraci object {}
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
            response.writeHead(200, { 'Content-Type': 'application/json' }); // HTTP status kod
            json = JSON.parse(fs.readFileSync('data.json', 'utf8'));
            response.write(JSON.stringify(json));
            break;
        case 'DELETE':
        case 'PUT':
        case 'POST': response.writeHead(501);/*501 nen9 implementováno*/
        break;
        default: response.writeHead(404);
    }
    response.end();
});
console.log('Posloucham')
server.listen(8080); /*podrží server beukončí se a čeká poslouchá*/



/*//nodejs.org/docs/latest-v9.x/api/*/



