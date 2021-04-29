//blog on readline/prompt package in Node.js
//https://attacomsian.com/blog/nodejs-read-input-from-cli

//Copy file functionality found here.
//https://coursesweb.net/nodejs/move-copy-file

//Import readline from node.js
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Check input for copying DB
rl.question(`Do you want to create a database from template, yes or no?`, (DBinput) => {
    if(DBinput == 'yes') {
        //file = "/autograder_template.db";
        //dest = "/autograder.db";
        //dir2 = "/data";

        //copy the $file to $dir2
        var copyFile = (file, dir2)=>{
        //include the fs, path modules
        var fs = require('fs');
        var path = require('path');
  
        //gets file name and adds it to dir2
        var f = path.basename(file);
        var source = fs.createReadStream(file);
        var dest = fs.createWriteStream(path.resolve(dir2, f));
  
            source.pipe(dest);
            source.on('end', function() { console.log('Succesfully copied'); });
            source.on('error', function(err) { console.log(err); });
        };

        //copy autograder_template.db from 'src/data/' to 'src/data/'
        copyFile('./src/data/autograder_template.db', './src/data/');
  
        //display more input
        console.log(`${DBinput}, the database files have been copied`);
    }
    else {
        console.log('The user does not want to copy autograder.db from template');
    }
  
    rl.question(`Do you want to generate OAuth config files? `, (OAinput) => {
        if(OAinput == 'yes') {
            // display input
            console.log(`${OAinput}, the user wants to generate OAuth config`);
        }
        else {
            console.log('The user does not want to generate OAuth config files.')
        }

        // close stream
        rl.close();
    });

});

//console.log('test DBCopy.js');
