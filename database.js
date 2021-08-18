const { Sequelize } = require("sequelize");

const database = new Sequelize('Translations-cache','codeyoung','codeyoung',{
    host:'localhost',
    dialect:'sqlite',
    storage:'Translations.db',
    logging:false
});
  
const Translations = database.define('translations',{
    Speech:{
        type: Sequelize.STRING,
    },
    convertedTo:{
        type: Sequelize.STRING
    },
    TranslatedText:{
        type: Sequelize.STRING
    }
});

module.exports={
    database,
    Translations
}