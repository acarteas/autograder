function serverCopy() {

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

fs.access('oauthconfig.json', (err) => {
    if (err) {
        console.log("server oauthconfig.json does not exist.");
        rl.question(`Do you want to generate a server oauthconfig.json? `, (OAinput) => {
            if(OAinput == 'yes') {
                fs.writeFile('oauthconfig.json', '{ "client_id": "id", "client_secret": "secret" }', function (err) {
                    if (err) throw err;
                    console.log('Client oauthconfig.json created successfully.');
                    console.log('Be sure to add the client id and client secret!');
                    console.log('Make sure that oauthconfig is in the gitignore!.');
                });
            }
            else {
                console.log('server oauthconfig.json will not be generated.')
            }
        
            // close stream
            rl.close();
        });

    } else {
        console.log("server oauthconfig.json exists.");
    }
});

    return 1;
}