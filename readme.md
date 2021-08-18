# TRANSLATION API WITH CACHE IMPLEMENTATION
A design of an API for translation of text to any particular language the user wants. There is implementation of cache using Database for repeatedly hitting api's.<br/>

**Working On**
-

**Tech stack used**<br/>
  >Nodejs<br/>
  >Express framework<br/>
  >Sequelize<br/>


**Theme of the API**
- Translates text<br/>
- Implements caching for repeated api hits<br/>

**Key modules used**<br>
- vitalets/google-translate-api (for translating text)<br/> 

**Explanation of Design Decisions**

- Express framework used <br/>
- Server.js has the functionality of text translation and Caching<br/>
- Client enters text and language he wants to translate it to<br/>
- At the server side Language code is detected by using pre mentioned formats in HTML form as we need this code for translation<br/>
- vitalets/google-translate-api module is used to translate the text, text and language code are passed as parameters to translate function provided by this module and in response we get the translated text<br/>
- This translated text is cached to reduce response time of repeated api hits<br>