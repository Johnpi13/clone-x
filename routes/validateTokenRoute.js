const express = require("express")
const router = express.Router()

const validateToken = require('../controllers/validateTokenController');

router.get("/validateToken", validateToken);

module.exports = router