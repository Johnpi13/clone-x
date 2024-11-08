const { getTweets } = require('../../services/tweetService');
const tweets = require('../../mocked_data/tweets');

jest.mock('../../mocked_data/tweets', () => [
    { id: 1, text: "Hello World!" },
    { id: 2, text: "This is a test tweet." }
]);

describe('getTweets', () => {
    it('should return the list of tweets if tweets data exists', () => {
        const result = getTweets();
        expect(result).toEqual([
            { id: 1, text: "Hello World!" },
            { id: 2, text: "This is a test tweet." }
        ]);
    });

    it('should return an empty array if tweets data does not exist', () => {
        jest.resetModules();


        jest.doMock('../../mocked_data/tweets', () => null);


        const { getTweets } = require('../../services/tweetService');

        const result = getTweets();
        expect(result).toEqual([]);
    });
});
