// Importing Libraries
const express = require("express");

const translate = require('@vitalets/google-translate-api');


// Importing database from database.js
const {database,Translations} = require('./database')

// Initializing port
const PORT = process.env.PORT || 5000;

// Setting up Express
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}));


app.use(express.static('./views'));
app.set('view engine', 'ejs');

// Getting home page
app.get('/',(req,res) => {
  res.render('speechtranslator',{translated:""})
})

// Translation and Storing part
app.post('/speechtranslator',(req,res) => {

  console.log(req.body);

    // Finding if The Text is in the Database or not.
  Translations.findOne({
    where: {
     Speech: req.body.speech,
     convertedTo: req.body.language
    }
   }).then((resp)=>{
       if(resp){
            //  If present, accessing data from database
            res.render('speechtranslator',{translated:resp.dataValues.TranslatedText})
       }else{
            //    If not present, Fetching data from API
            translate(req.body.speech, {to: req.body.language}).then(response => {
                res.render('speechtranslator',{translated:response.text})

                // Saving New Data in the Database
                Translations.create({
                    Speech: req.body.speech,
                    convertedTo: req.body.language,
                    TranslatedText: response.text
                }).then(()=>{
                    console.log('Data saved.')
                });
            }).catch(err => {
                console.error(err);
            });
       }
  }).catch(err =>{
      console.log(err);
  })

})


// Syncing Database and connecting to port.
database.sync()
    .then(()=>{
        console.log('SQL database synced.');
        app.listen(PORT, () => {
            console.log(`App is listening on Port ${PORT}`);
        });
    });

