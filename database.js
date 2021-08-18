const { Sequelize } = require("sequelize");

// Initialising Database
const database = new Sequelize('Translations-cache','codeyoung','codeyoung',{
    host:'localhost',
    dialect:'sqlite',
    storage:'Translations.db',
    logging:false
});
  
// Initializing Table
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