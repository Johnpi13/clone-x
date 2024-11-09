const Tweet = require('../models/tweetSchema');
const User = require('../models/userSchema');


const addFollower = async (request, response) => {

  console.log('Request params:', request.params);

  const userNameToFollow = request.params.user;
  const currentUserName = request.user;

  if (userNameToFollow == currentUserName) {
    response.status(500).json({
      success: false,
      msg: "Cannot follow youself"
    })

    return;
  }

  console.log('User to follow:', userNameToFollow);
  console.log('Current user:', currentUserName);

  try {

    const userToFollow = await User.findOne({ userName: userNameToFollow });
    if (!userToFollow) {
      return response.status(404).json({ msg: 'User to follow not found' });
    }

    const currentUser = await User.findOne({ userName: currentUserName });
    if (!currentUser) {
      return response.status(404).json({ msg: 'Current user not found' });
    }
    console.log(currentUser);
    console.log(userToFollow);

    if (currentUser.following.includes(userNameToFollow)) {
      response.status(500).json({
        msg: "Already following this user"
      })

      return;
    }

    await User.findByIdAndUpdate(userToFollow._id, { $addToSet: { followers: currentUserName } }, { new: true });

    await User.findByIdAndUpdate(currentUser._id, { $addToSet: { following: userNameToFollow } }, { new: true });

    response.json({ msg: 'Follower added' });


  } catch (error) {
    response.status(500).json({ msg: 'Something went wrong', error: error.message });
  }

};

const removeFollowed = async (request, response) => {
  const userNameToUnfollow = request.params.user;

  try {

    const userToUnfollow = await User.findOne({ userName: userNameToUnfollow });
    if (!userToUnfollow) {
      return response.status(404).json({ msg: 'User not found' });
    }


    const currentUser = await User.findOne({ userName: request.user });


    await User.findByIdAndUpdate(userToUnfollow._id, { $pull: { followers: currentUser.userName } });
    await User.findByIdAndUpdate(currentUser._id, { $pull: { following: userNameToUnfollow } });

    response.json({ msg: 'Unfollowed successfully' });
  } catch (error) {
    response.status(500).json({ msg: 'Something went wrong', error: error.message });
  }
};

const getUserInfo = async (request, response) => {
  const userName = request.query.userName;
  const loggedUsername = request.user;

  try {
    const user = await User.findOne({ userName: userName });
    const loggedUser = await User.findOne({ userName: loggedUsername });

    const followingUser = loggedUser.following.includes(userName);
    response.json({ user, followingUser });
  } catch (error) {
    response.status(500).json({ msg: 'Something went wrong', error: error.message });
  }
}

const countFollowers = async (request, response) => {
  const userName = request.params.userName;

  try {
    const user = await User.findOne({ userName: userName });
    response.json({ followersCount: user.followers.length });
  } catch (error) {
    response.status(500).json({ msg: 'Something went wrong', error: error.message });
  }
};

const countFollowed = async (request, response) => {
  const userName = request.params.userName;

  try {
    const user = await User.findOne({ userName: userName });
    response.json({ followingCount: user.following.length });
  } catch (error) {
    response.status(500).json({ msg: 'Something went wrong', error: error.message });
  }
};

const getFollowers = async (req, res) => {
  const userName = req.params.userName;

  try {
    const user = await User.findOne({ userName: userName });
    const followers = await User.find({ userName: { $in: user?.followers } })

    res.status(200).json({
      success: true,
      followerUsers: followers
    });

  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong', error: error.message });
  }
}

const getFollowed = async (req, res) => {
  const userName = req.params.userName;

  try {
    const user = await User.findOne({ userName: userName });

    const followed = await User.find({ userName: { $in: user?.following } });

    res.status(200).json({
      success: true,
      followingUsers: followed
    });
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong', error: error.message });
  }
}

const getRecentTweets = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    const users = await User.find({ userName: { $in: user.following } });
    const userNames = users.concat(user).map(m => m.userName);
    const tweets = await Tweet.find({ userName: { $in: userNames } }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tweets
    })
  }
  catch(err) {
    console.log('Error in getRecentTweets:', err);
    res.status(500).json({ msg: 'Something went wrong', error: err.message });
  }
}

const removeFollower = async (request, response) => {
  response.json({ msg: "Follower removed" });
};

module.exports = {
  countFollowers,
  addFollower,
  countFollowed,
  removeFollowed,
  removeFollower,
  getFollowers,
  getFollowed,
  getRecentTweets,
  getUserInfo
};
