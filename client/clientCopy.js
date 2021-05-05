//blog on readline/prompt package in Node.js
//https://attacomsian.com/blog/nodejs-read-input-from-cli

//Copy file functionality found here.
//https://coursesweb.net/nodejs/move-copy-file

function clientCopy() {

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
  
fs.access('src/oauthconfig.json', (err) => {
    if (err) {
        console.log("client oauthconfig.json does not exist.");
        rl.question(`Do you want to generate a client oauthconfig.json? `, (OAinput) => {
            if(OAinput == 'yes') {
                fs.writeFile('./src/oauthconfig.json', '{ "client_id": "id", "client_secret": "secret" }', function (err) {
                    if (err) throw err;
                    console.log('Client Oauthconfig created successfully.');
                    console.log('Be sure to add the client id and client secret!');
                    console.log('Make sure that oauthconfig is in the gitignore!.');
                });
            }
            else {
                console.log('client oauthconfig.json will not be generated.')
            }
        
            // close stream
            rl.close();
        });
        
    } else {
        console.log("client oauthconfig.json exists.");
    }
});

    return 1;
}
