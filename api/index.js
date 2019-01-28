const router = require('express').Router()
const {User, Tweet} = require('./db/models'); 


router.get('/:userId', async (req, res, next) => { 
    try {
        const tweets = await Tweet.findAll({ 
            where: { 
                tweeterId: req.params.userId
            }
        })
        res.json(tweets); 
    } catch (error) {
        console.error(error); 
    }
})

router.post('/:userId', async (req, res, next) => { 
    try {
        const tweet = await Tweet.create({ //create not build
            content: req.body.content
        })
        const tweeter = await User.findById(req.params.userId); 
        tweet.setTweeter(tweeter); 
        res.json(tweet); 
    } catch (error) {
        console.error(error); 
    }
})

router.put(':/userId/tweets/:tweetId', async (req, res, next) => { 
   try {
       const update = await Tweet.update(req.body, { 
           where: { 
               id: req.params.tweetId
           }, 
           returning: true //return the updated columns 
       })
       res.json({
           message: 'Updated successfully', 
           tweet: update[1][0]
       })
   } catch (error) {
       console.error(error); 
   }
})


module.exports = router; 