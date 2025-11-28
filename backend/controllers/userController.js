const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try{
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if(existingUser){
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', "user_id": newUser._id });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error', status: false, error: error});
    }
};
exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET || "secret", { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', jwt_token:token });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error', status: false, error: error});
    }
};