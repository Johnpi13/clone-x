const { getUser, createUser } = require('../../services/userService');
const User = require('../../models/userSchema');


jest.mock('../../models/userSchema');

describe('userService', () => {
    describe('getUser', () => {
        it('should return a user when email is provided and user exists', async () => {
            const mockUser = { userName: 'john', email: 'john@example.com' };

            User.findOne.mockResolvedValue(mockUser);

            const result = await getUser({ email: 'john@example.com' });

            expect(User.findOne).toHaveBeenCalledWith({
                $or: [{ email: 'john@example.com' }]
            });
            expect(result).toEqual(mockUser);
        });

        it('should return a user when userName is provided and user exists', async () => {
            const mockUser = { userName: 'john', email: 'john@example.com' };

            User.findOne.mockResolvedValue(mockUser);

            const result = await getUser({ userName: 'john' });

            expect(User.findOne).toHaveBeenCalledWith({
                $or: [{ userName: 'john' }]
            });
            expect(result).toEqual(mockUser);
        });

        it('should return null when no user is found', async () => {
            User.findOne.mockResolvedValue(null);

            const result = await getUser({ email: 'nonexistent@example.com' });

            expect(User.findOne).toHaveBeenCalledWith({
                $or: [{ email: 'nonexistent@example.com' }]
            });
            expect(result).toBeNull();
        });

        it('should return null if there is an error', async () => {
            User.findOne.mockRejectedValue(new Error('Database error'));

            const result = await getUser({ email: 'john@example.com' });

            expect(result).toBeNull();
        });
    });

    describe('createUser', () => {
        it('should create a user successfully', async () => {
            const mockUserData = { userName: 'john', email: 'john@example.com' };
            const mockUser = { ...mockUserData };


            User.mockImplementation(() => ({
                ...mockUser,
                save: jest.fn().mockResolvedValue(mockUser)
            }));


            const result = await createUser(mockUserData);


            expect(result.success).toBe(true);
            expect(result.user).toMatchObject(mockUser);
        });

        it('should return an error if there is an issue creating the user', async () => {
            const mockUserData = { userName: 'john', email: 'john@example.com' };


            User.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error('Validation error'))
            }));

            const result = await createUser(mockUserData);

            expect(result.success).toBe(false);
            expect(result.error).toBe('Validation error');
        });
    });
});
