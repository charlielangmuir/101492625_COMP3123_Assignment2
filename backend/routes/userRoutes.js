const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    await req.ensureDB();
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ status: false, message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ status: false, message: "User already exists" });

    const newUser = await User.create({ username, email, password });
    res.status(201).json({ message: "User created successfully", user_id: newUser._id.toString() });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    await req.ensureDB();
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user)
      return res.status(401).json({ status: false, message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
});

module.exports = router;
