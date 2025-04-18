const express = require("express");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const User = require("../models/user");

const router = express.Router();

// Session setup
router.use(session({
    secret: "agrohub_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// REGISTER Route
router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword, role });

        await user.save();
        res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// LOGIN Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        req.session.user = { id: user._id, name: user.name, role: user.role };
        res.json({ msg: "Login successful", user: req.session.user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// LOGOUT Route
router.post("/logout", (req, res) => {
    req.session.destroy();
    res.json({ msg: "Logged out successfully" });
});

module.exports = router;
