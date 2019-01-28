const Sequelize = require('sequelize')
const db = require('./db')

const User = db.define('user', {
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

Tweet.belongsTo(User, {as: 'tweeter'}); 
User.hasMany(Tweets); 


module.exports = {User, Tweet}

//review hooks 
//have some tags thing 
//class method and instance method 