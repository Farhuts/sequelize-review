const Sequelize = require('sequelize')
const db = require('./db')

    //write  a user model that contains a name, an email, and a password 
    //write validations athat make sure the fields are not empty and inclue a special validation for email
    //write a hook that hashes the password before the instance is created, using the given hash function 
    //write a getter method that causes the email to be returned as a lower case string



    //write a tweet model that contains content, favorites, and retweets
    //make sure the content can't be null and give the other two a default value 


//alt method for hook 

//use this hashfunction 
function hash(str) {
    let hash = 5381; 
    let i = str.length;
  
    while(i) {
      hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
}

//set asssociations, using the "as" keyword 




module.exports = {User, Tweet}
