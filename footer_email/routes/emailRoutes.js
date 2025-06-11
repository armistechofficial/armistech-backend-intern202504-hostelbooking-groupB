console.log("Email routes loaded");

const express = require("express");
const router = express.Router();
const { subscribeEmail } = require("../controllers/emailController");

router.post("/subscribe", subscribeEmail);

module.exports = router;
