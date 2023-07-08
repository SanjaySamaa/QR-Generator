import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs"
 
//1. Use the inquirer npm package to get user input.
//2. Use the qr-image npm package to turn the user entered URL into a QR code image.
//3. Create a txt file to save the user input using the native fs node module.
inquirer
  .prompt([
    /* Pass your questions in here */
    {
        message:"Enter Your Url To Generate The Qr : ",
        name : "URL"
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    let url = answers.URL;
    // var qr = require('qr-image');
 
    var qr_svg = qr.image(url);
    // var t1 = url.split("https://www.").split(".com");
    // var t2 = t1.split(".com");
    qr_svg.pipe(fs.createWriteStream("QR.png"));
    // var qr_svg = qr.image('I love QR!', { type: 'svg' });
    // qr_svg.pipe(require('fs').createWriteStream('i_love_qr.svg'));
    // var svg_string = qr.imageSync('I love QR!', { type: 'svg' });
    if(fs.existsSync("entered-url.txt")){
      fs.appendFile("entered-url.txt","\n"+url,(error)=>{
        if(error)throw error;
        console.log("url saved");
      });
    }else{
    fs.writeFile("entered-url.txt",url,(error)=>{
      if(error)throw error;
      console.log("url saved");
    });}
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("cannot prompt the message something is wrong");
    } else {
      // Something else went wrong
      console.log("something wrong"+error);
    }
  });

