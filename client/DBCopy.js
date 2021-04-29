//blog on readline/prompt package in Node.js
//https://attacomsian.com/blog/nodejs-read-input-from-cli
//Import readline from node.js
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Check input to 
rl.question(`Do you want to create a database from template?`, (DBinput) => {

    rl.question(`Do you want to generate OAuth config files? `, (OAinput) => {

        // display input
        console.log(`${DBinput}, the user wants to copy database files`);
        console.log(`${OAinput}, the user wants to generate OAuth config`);

        // close stream
        rl.close();
    });

});

//console.log('test DBCopy.js');
