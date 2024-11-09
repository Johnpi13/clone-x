const { listTweets } = require("../../controllers/tweetController");
const { publishTweet } = require("../../controllers/tweetController");
const { updateTweet } = require("../../controllers/tweetController");
const { deleteTweet } = require("../../controllers/tweetController");
const Tweet = require("../../models/tweetSchema");

jest.mock("../../models/tweetSchema");
() => ({
  find: jest.fn(),
});

describe("tweetController.js", () => {
  describe("list of tweet", () => {
    test("should return a list of tweets", async () => {
      const mockTweets = [
        { id: 1, userName: "fabio", body: "Hello" },
        { id: 2, userName: "hernesto", body: "Another tweet" },
      ];

      Tweet.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockTweets),
      });

      const req = { baseUrl: "/tweets" };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await listTweets(req, res);

      expect(Tweet.find).toHaveBeenCalledWith({ userName: "tweets" });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTweets);
    });
  });
});

describe("publishTweet", () => {
  test("should publish a new tweet", async () => {
    const newTweet = {
      userName: "testUser",
      body: "Hola",
    };

    const mockTweetInstance = {
      save: jest.fn().mockResolvedValue(newTweet),
    };

    Tweet.mockImplementation(() => mockTweetInstance);

    const req = {
      user: "testUser",
      body: {
        body: "Hola",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await publishTweet(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      newTweet,
    });
  });
});

describe("updateTweet", () => {
  test("should update an existing tweet", () => {
    const req = { body: { id: 1, body: "Updated tweet content" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const tweets = [{ id: 1, body: "Original tweet content" }];
    global.getTweets = jest.fn().mockReturnValue(tweets);

    updateTweet(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      msg: "Tweet actualizado",
      tweet: { id: 1, body: "Updated tweet content" },
    });
  });

  test("should return 404 if tweet not found", () => {
    const req = { body: { id: 2, body: "Updated tweet content" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    global.getTweets = jest
      .fn()
      .mockReturnValue([{ id: 1, body: "Original tweet content" }]);

    updateTweet(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: "Tweet no encontrado" });
  });
});

describe("deleteTweet", () => {
  test("should delete an existing tweet", () => {
    const req = { body: { id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const tweets = [{ id: 1, body: "Tweet to be deleted" }];
    global.getTweets = jest.fn().mockReturnValue(tweets);

    deleteTweet(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: "Tweet eliminado" });
  });

  test("should return 404 if tweet not found", () => {
    const req = { body: { id: 2 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    global.getTweets = jest
      .fn()
      .mockReturnValue([{ id: 1, body: "Another tweet" }]);

    deleteTweet(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: "Tweet no encontrado" });
  });
});
