const express = require("express");

const translate = require('@vitalets/google-translate-api');

const {database,Translations} = require('./database')

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 5000;

app.use(express.static('./views'));
app.set('view engine', 'ejs');

app.get('/speechtranslator',(req,res) => {
  res.render('speechtranslator',{title:"Speech Translator Online to Multiple Languages - Free Media Tools",translated:""})
})

app.post('/speechtranslator',(req,res) => {

  console.log(req.body);

  Translations.findOne({
    where: {
     Speech: req.body.speech,
     convertedTo: req.body.language
    }
   }).then((resp)=>{
       if(resp){
            res.render('speechtranslator',{title:"Speech Translator Online to Multiple Languages - Free Media Tools",translated:resp.dataValues.TranslatedText})
       }else{
            translate(req.body.speech, {to: req.body.language}).then(response => {
                res.render('speechtranslator',{title:"Speech Translator Online to Multiple Languages - Free Media Tools",translated:response.text})
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


database.sync()
    .then(()=>{
        console.log('SQL database synced.');
        app.listen(PORT, () => {
            console.log(`App is listening on Port ${PORT}`);
        });
    });

