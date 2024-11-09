const userController = require("../../controllers/userController");
const User = require("../../models/userSchema");
const Tweet = require("../../models/tweetSchema");

jest.mock("../../models/userSchema");
jest.mock("../../models/tweetSchema");

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("add follower", () => {
    test("should add a follower successfully", async () => {
      const req = {
        params: { user: "userToFollow" },
        user: "currentUser",
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne
        .mockResolvedValueOnce({
          _id: "userToFollowId",
          userName: "userToFollow",
          following:[],
        }) 
        .mockResolvedValueOnce({
          _id: "currentUserId",
          userName: "currentUser",
          following:[],
        }); 

      User.findByIdAndUpdate.mockResolvedValueOnce({});

      await userController.addFollower(req, res);

      expect(User.findOne).toHaveBeenCalledTimes(2);
      expect(User.findByIdAndUpdate).toHaveBeenCalledTimes(2);
      expect(res.json).toHaveBeenCalledWith({ msg: "Follower added" });
    });

    test("should return 404 if user to follow not found", async () => {
      const req = {
        params: { user: "nonExistentUser" },
        user: "currentUser",
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockResolvedValueOnce(null); 

      await userController.addFollower(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        msg: "User to follow not found",
      });
    });
  });
  describe("removeFollowed", () => {
    test("should remove a followed user successfully", async () => {
      const req = {
        params: { user: "userToUnfollow" },
        user: "currentUser",
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne
        .mockResolvedValueOnce({
          _id: "userToUnfollowId",
          userName: "userToUnfollow",
        }) 
        .mockResolvedValueOnce({
          _id: "currentUserId",
          userName: "currentUser",
        }); 

      User.findByIdAndUpdate.mockResolvedValueOnce({});

      await userController.removeFollowed(req, res);

      expect(User.findOne).toHaveBeenCalledTimes(2);
      expect(User.findByIdAndUpdate).toHaveBeenCalledTimes(2);
      expect(res.json).toHaveBeenCalledWith({ msg: "Unfollowed successfully" });
    });
  });
  describe("countFollowers", () => {
    test("should return the correct number of followers", async () => {
      const req = { params: { userName: "userTest" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockResolvedValueOnce({
        followers: ["follower1", "follower2"],
      });

      await userController.countFollowers(req, res);

      expect(res.json).toHaveBeenCalledWith({ followersCount: 2 });
    });
  });
  describe("getRecentTweets", () => {
    test("should return recent tweets from followed users", async () => {
      const req = { userId: "currentUserId" };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findById.mockResolvedValueOnce({
        following: ["user1", "user2"],
        userName: "currentUser",
      });
      User.find.mockResolvedValueOnce([
        { userName: "user1" },
        { userName: "user2" },
      ]);

      Tweet.find.mockReturnValue({
        sort: jest.fn().mockResolvedValueOnce([
          { content: "Tweet 1", createdAt: new Date() },
          { content: "Tweet 2", createdAt: new Date() }
        ])
      });

      await userController.getRecentTweets(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        tweets: expect.any(Array),
      });
    });
  });
});
