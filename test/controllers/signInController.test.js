const { signInUser } = require("../../controllers/signInController");
const { validationResult } = require("express-validator");
const userService = require("../../services/userService");
const authService = require("../../services/authService");
const bcrypt = require("bcrypt");

jest.mock("express-validator");
jest.mock("../../services/userService");
jest.mock("../../services/authService");
jest.mock("bcrypt");

describe("sigInController.js", () => {
  let req;
  let res;
  beforeEach(() => {
    req = {
      body: {
        userName: "testUser",
        password: "password123",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("Auth Controller - signInUser", () => {
    describe("return auth satisfactory", () => {
      test("should return a token for valid credentials", async () => {
        validationResult.mockReturnValue({
          isEmpty: jest.fn().mockReturnValue(true),
        });
        const user = {
          _doc: {
            id: "123",
            userName: "testUser",
            password:
              "$2b$10$d/PfCRIy1bJUcOJ0NdUq.uLIivKop1RpHLHTCnHn.h4XMAzpbTbqu",
          },
        };
        userService.getUser.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(true);
        authService.getAuthToken.mockResolvedValue("fakeAuthToken");

        await signInUser(req, res);

        expect(bcrypt.compare).toHaveBeenCalledWith(
          req.body.password,
          user.password
        );
        const { password, ...payload } = user;
        

        expect(authService.getAuthToken).toHaveBeenCalledWith(payload._doc);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          msg: "logged in",
          authToken: "fakeAuthToken",
        });
      });
    });

    describe("Invalid credentials", () => {
      test("should return 401 for invalid password", async () => {
        validationResult.mockReturnValue({
          isEmpty: jest.fn().mockReturnValue(true),
        });
        userService.getUser.mockResolvedValue({
          password: "hashedPassword",
        });
        bcrypt.compare.mockResolvedValue(false);

        await signInUser(req, res);

        // Verificar resultados
        expect(bcrypt.compare).toHaveBeenCalledWith(
          req.body.password,
          "hashedPassword"
        );
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
          error: "Unauthorized",
          message: "Invalid credentials",
        });
      });
    });

    describe("User not found", () => {
      test("should return 401 if user does not exist", async () => {
        validationResult.mockReturnValue({
          isEmpty: jest.fn().mockReturnValue(true),
        });
        userService.getUser.mockResolvedValue(null);

        await signInUser(req, res);

        // Verificar resultados
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
          error: "Unauthorized",
          message: "Invalid credentials",
          statusCode: 401,
        });
      });
    });
  });
});
