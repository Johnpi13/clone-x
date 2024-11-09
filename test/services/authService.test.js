const jwt = require('jsonwebtoken');
const { getAuthToken } = require('../../services/authService');

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

describe('getAuthToken', () => {
    it('should generate a token with the given payload', async () => {

        const payload = { userId: 123 };
        const mockToken = 'mocked.jwt.token';


        jwt.sign.mockResolvedValue(mockToken);


        const token = await getAuthToken(payload);


        expect(jwt.sign).toHaveBeenCalledWith(payload, process.env.JWT_SECRET);

        expect(token).toBe(mockToken);
    });
});