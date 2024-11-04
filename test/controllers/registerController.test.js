const { registerUser } = require("../../controllers/registerController");
const { validationResult } = require("express-validator");
const { createUser } = require("../../services/userService");
const bcrypt = require("bcrypt");

// Mocks
jest.mock("express-validator");
jest.mock("../../services/userService");
jest.mock("bcrypt");

describe("registerController.js", () => {
  describe("register new user", () => {
    describe("with valid fields", () => {
      test("should return a created new user", async () => {
        const req = {
          body: {
            fullName: "John Doe",
            userName: "johndoe",
            email: "johndoe@example.com",
            password: "password123",
          },
        };

        // Simulamos la respuesta
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };

        // Mocks para las funciones que se usan en `registerUser`
        validationResult.mockReturnValue({
          isEmpty: jest.fn().mockReturnValue(true),
        });
        bcrypt.hash.mockResolvedValue("hashedPassword123");
        createUser.mockResolvedValue({
          success: true,
          user: { id: "123", ...req.body, password: "hashedPassword123" },
        });

        // Ejecutamos la función
        await registerUser(req, res);

        // Verificaciones
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
    });
  });
});
