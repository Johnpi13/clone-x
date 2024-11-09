const { registerUser } = require("../../controllers/registerController");
const { validationResult } = require("express-validator");
const { createUser } = require("../../services/userService");
const bcrypt = require("bcrypt");

jest.mock("express-validator");
jest.mock("../../services/userService");
jest.mock("bcrypt");

describe("registerController.js", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        fullName: "John Doe",
        userName: "johndoe",
        email: "johndoe@example.com",
        password: "password123",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("register new user", () => {
    describe("with valid fields", () => {
      test("should return a created new user", async () => {
        validationResult.mockReturnValue({
          isEmpty: jest.fn().mockReturnValue(true),
        });
        bcrypt.hash.mockResolvedValue("hashedPassword123");
        createUser.mockResolvedValue({
          success: true,
          user: { id: "123", ...req.body, password: "hashedPassword123" },
        });

        await registerUser(req, res);

        expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 10);
        expect(createUser).toHaveBeenCalledWith({
          fullName: "John Doe",
          userName: "johndoe",
          email: "johndoe@example.com",
          password: "hashedPassword123",
          followers: [],
          following: [],
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          msg: "Usuario registrado exitosamente",
          user: expect.objectContaining({ id: "123" }),
        });
      });
      test("should return 409 if user already exists", async () => {
        validationResult.mockReturnValue({
          isEmpty: jest.fn().mockReturnValue(true),
        });
        createUser.mockResolvedValue({
          success: false,
          error: "Usuario ya registrado",
        });

        await registerUser(req, res);

        expect(createUser).toHaveBeenCalledWith({
          fullName: req.body.fullName,
          userName: req.body.userName,
          email: req.body.email,
          password: expect.any(String),
          followers: [],
          following: [],
        });
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ msg: "Usuario ya registrado" });
      });

      test("should return 500 if user creation fails", async () => {
        validationResult.mockReturnValue({
          isEmpty: jest.fn().mockReturnValue(true),
        });

        bcrypt.hash.mockResolvedValue("hashedPassword123");
        createUser.mockResolvedValue({
          success: false,
          error: "User creation failed",
        });

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          error: "User creation failed",
        });
      });

      test("should return 500 if an unexpected error occurs", async () => {
        validationResult.mockReturnValue({
          isEmpty: jest.fn().mockReturnValue(true),
        });

        bcrypt.hash.mockRejectedValue(new Error("Unexpected error"));

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          msg: "Error al registrar el usuario",
          error: "Unexpected error",
        });
      });
    });
  });
});
