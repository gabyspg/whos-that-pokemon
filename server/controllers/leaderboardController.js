const User = require('../models/userModel');

const leaderboardController ={};

leaderboardController.getHighScores = async (req, res, next) => {
   try {
        const leaderboardData = await User.find({}, 'username userHighScore')
        .sort({ userHighScore: -1 });
        res.json(leaderboardData);
        return next();
    } catch (error){
        console.error(error);
        return next({
           log: 'Error handler caught getHighScores middleware error',
           status: 500,
           message: {err: 'Cannot get highScores'}
        });
    }
}

leaderboardController.getUserAndUpdate = async (req, res, next) => {
        console.log(req.body)
    try{
        const username = req.body.username;
        const newUserHighScore = req.body.userHighScore;
        const updateUser = await User.findOneAndUpdate(
            {username: username}, 
            {userHighScore: newUserHighScore},
            {new: true}
            );
        res.json(updateUser)
        return next();
    } catch (error) {
        return next({
            log: 'Error handler caught getUserandUpdate middleware error',
            status:400,
            message: {error: 'Cannot update score'}
        });
    }
}

module.exports = leaderboardController;