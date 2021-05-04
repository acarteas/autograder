const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

fs.access('autograder.db', (err) => {
    if (err) {
        console.log('autograder.db does not exist.');
        //Check input for copying DB
        rl.question(`Create autograder.db from template, yes or no?`, (DBinput) => {
            if(DBinput == 'yes') {

                //copy the $file to $dir2
                var copyFile = (file, dir2)=>{
  
                    //gets file name and adds it to dir2
                    var f = path.basename(file);
                    var source = fs.createReadStream(file);
                    var dest = fs.createWriteStream(path.resolve(dir2, f));
  
                    source.pipe(dest);
                    source.on('end', function() { console.log('Succesfully copied'); });
                    source.on('error', function(err) { console.log(err); });
                };

                //copy autograder.db from template into the data folder'
                copyFile('autograder_template.db', 'autogradertest.db');
  
                //display more input
                console.log(`autograder.db has been copied.`);
                console.log(`Make sure autograder.db is in the gitignore!`);
            }
            else {
                console.log('autograder.db will not be copied.');
            }
        });
    } 
    else {
        console.log('autograder.db exists.');
    }
});