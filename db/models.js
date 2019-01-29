const Sequelize = require('sequelize')
const db = require('./db')

const User = db.define('user', {
    //write  a user model that contains a name, an email, and a password 
    //write validations athat make sure the fields are not empty and inclue a special validation for email
    //write a hook that hashes the password before the instance is created, using the given hash function 
    //write a getter method that causes the email to be returned as a lower case string
    name: { 
        type: Sequelize.STRING, 
        validate : {
            notEmpty: true
        } 
    }, 
    email: { 
        type: Sequelize.STRING, 
        validate : { 
            isEmail: true, 
            notEmpty: true
        },
        get() { 
            return this.getDataValue('name').toLowerCase(); 
        }
    }, 
    password: { 
        type: Sequelize.STRING, 
        validate : { 
            notEmpty: true
        }
    }, 
    hooks: {
        beforeCreate: (user, options) => { 
            user.password = hash(user.password); 
        }
    }

})

const Tweet = db.define('tweet', {
    //write a tweet model that contains content, favorites, and retweets
    //make sure the content can't be null and give the other two a default value 
    content : { 
        type: Sequelize.TEXT, 
        allowNull: false
    }, 
    favorites: { 
        type: Sequelize.INTEGER, 
        defaultValue: 0
    }, 
    retweets: { 
        type: Sequelize.INTEGER, 
        defaultValue: 0
    }, 

})

//alt method for hook 
User.beforeCreate((user, options) => { 
    let hashedPassword = hash(user.password); 
    user.password = hashedPassword; 
})

function hash(str) {
    let hash = 5381; 
    let i = str.length;
  
    while(i) {
      hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
}

//set asssociations, using the "as" keyword 

Tweet.belongsTo(User, {as: 'tweeter'}); 
User.hasMany(Tweets); 


module.exports = {User, Tweet}

//review hooks 
//have some tags thing 
//class method and instance method 