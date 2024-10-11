const User = require('../models/userSchema');


const addFollower = async (request, response) => {
  const userIdToFollow = request.params.userId;
  const currentUserId = request.userId;

  console.log('User to follow:', userIdToFollow);
  console.log('Current user:', currentUserId);

  try {

    const userToFollow = await User.findById(userIdToFollow);
    if (!userToFollow) {
      return response.status(404).json({ msg: 'User to follow not found' });
    }

    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return response.status(404).json({ msg: 'Current user not found' });
    }
    console.log(currentUser);
    console.log(userToFollow);

    
    await User.findByIdAndUpdate(userIdToFollow, { $addToSet: { followers: currentUserId }}, { writeConcern: { w: "majority" } });

    await User.findByIdAndUpdate(currentUserId, { $addToSet: { following: userIdToFollow }}, { writeConcern: { w: "majority" } });
    
    response.json({ msg: 'Follower added' });

    
  } catch (error) {
    response.status(500).json({ msg: 'Something went wrong', error: error.message });
  }

};

const removeFollowed = async (request, response) => {
  const userIdToUnfollow = request.params.userId;

  try {

    const user = await User.findById(userIdToUnfollow);
    if (!user) {
      return response.status(404).json({ msg: 'User not found' });
    }


    await User.findByIdAndUpdate(userIdToUnfollow, { $pull: { followers: request.userId } });

    await User.findByIdAndUpdate(request.userId, { $pull: { following: userIdToUnfollow } });

    response.json({ msg: 'Follower removed' });
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
