const countFollowers = (request, response) => {
  response.json(9);
};

const addFollower = (request, response) => {
  response.json({ msg: "Follower added"});
};

const countFollowed = (request, response) => {
  response.json(9);
};

const removeFollowed = (request, response) => {
  response.json({ msg: "removed"});
};

const removeFollower = (request, response) => {
  response.json({ msg: "Follower removed"});
};

module.exports = {
  countFollowers,
  addFollower,
  countFollowed,
  removeFollowed,
  removeFollower,
};
