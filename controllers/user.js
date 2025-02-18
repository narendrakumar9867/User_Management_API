const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { setUser } = require("../services/authentication");

async function handleUserSignup(req, res) {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    };

    if(!data) {
        return res.status(400).json({ msg: "all fiels are required."});
    }

    const existingUser = await User.findOne({ email: data.email });
    if(existingUser) {
        return res.status(400).json({ msg: "user already exist." });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;
        const user = await User.create(data);
        return res.status(201).json({ msg: "user created success.", user});
    } catch (error) {
        if(error.code === 11000) {
            return res.status(400).json({ msg: "email already exists."});
        }
        return res.status(500).json({ error: "internal server error.", details: error.message });
    }
};

async function handleUserLogin(req, res) {
    try {
        const { email, password, role } = req.body;
        const user = await User.findOne({ email });
        
        if(!user) {
            return res.status(404).json({ msg: 'user not found.'})
        }

        if (user.role !== role) {
            return res.status(403).json({ msg: 'Unauthorized role.' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(400).json({ msg: "invalid password."});
        }

        const token = setUser(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ msg: "interval server issue."})
    }
};

async function handleCreateNewUsers(req, res) {
    const body = req.body;
    if(!body || !body.name || !body.email || !body.password ) {
        return res.status(400).json({
            msg: "All fields are required."
        });
    }

    try {
        const result = await User.create({
            name: body.name,
            email: body.email,
            password: body.password,
            role: body.role
        });
    
        console.log("Result", result);
    
        return res.status(201).json({ 
            msg: "Successfully add new user", id: result._id
        })
    } catch (error) {
        return res.status(500).json({ error: "internal server error.", details: error.message });
    }
};

async function handleGetAllUsers(req, res) {
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
};

async function handleGetUserById(req, res) {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "invalid user id."});
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "user not found."});
        }

        return res.json(user);
    } catch (error) {
        console.error("error fetching user.", error);
        return res.status(500).json({ msg: "internal server error."});
    }
};

async function handleUpdateUserById(req, res) {
    const { name, email, password } = req.body;
    if(!(name || email || password)) {
        return res.status(400).json({ msg: "at least one field is required."});
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: {name, email, password }},
            { new: true, runValidators: true}
        );
        if(!updatedUser) {
            return res.status(404).json({ error: "User not found."});
        }
    
        return res.json({ status: "user updated.", user: updatedUser});
        
    } catch (error) {
        return res.status(500).json({ error: "internal server error.", details: error.message });
    }
};

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Delete user" });
};

module.exports = {
    handleCreateNewUsers,
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleUserSignup,
    handleUserLogin,
};