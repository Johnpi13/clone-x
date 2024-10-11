const User = require('../models/userSchema');


const addFollower = async (request, response) => {

  console.log('Request params:', request.params);

  const userNameToFollow = request.params.user;
  const currentUserName = request.user;

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

    
    await User.findByIdAndUpdate(userToFollow._id, { $addToSet: { followers: currentUserName }}, { new: true });

    await User.findByIdAndUpdate(currentUser._id, { $addToSet: { following: userNameToFollow }}, { new: true });
    
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

const countFollowers = async (request, response) => {
  const userId = request.userId;

  try {
    const user = await User.findById(userId);
    response.json({ followersCount: user.followers.length });
  } catch (error) {
    response.status(500).json({ msg: 'Something went wrong', error: error.message });
  }
};



const countFollowed = async (request, response) => {
  const userId = request.userId;

  try {
    const user = await User.findById(userId);
    response.json({ followingCount: user.following.length });
  } catch (error) {
    response.status(500).json({ msg: 'Something went wrong', error: error.message });
  }
};



const removeFollower = async (request, response) => {
  response.json({ msg: "Follower removed" });
};

module.exports = {
  countFollowers,
  addFollower,
  countFollowed,
  removeFollowed,
  removeFollower,
};
