const express = require('express');
const User = require('../model/user.model');
const generateToken = require('../middleware/generateToken');


const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const user = new User({ email, password, username });

        await user.save();
        res.status(201).send({
            message: "User registered successfully!", user: user
        });
    } catch (error) {
        console.error("Failed to register", error);
        res.status(500).json({
            message: "Error registering user",
            error: error.message 
        });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({
                message: "User not found!"
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).send({
                message: "Invalid password!"
            });
        }

        // TODO: Generate token here
        const token = await generateToken(user._id)
        res.cookie("token",token ,{
            httpOnly : true,
            secure: true,
            sameSite: true

        })

        res.status(200).send({
            message: "Login successful", token,
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Failed to login", error);
        res.status(500).json({
            message: "Error logging in",
            error: error.message 
        });
    }
});

// Logout a user
router.post("/logout", async (req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).send({ message: "Logout successful" });
    } catch (error) {
        console.error("Failed to logout", error);
        res.status(500).json({
            message: "Error logging out",
            error: error.message
        });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, '_id email role');
        res.status(200).send({ message: "Users found successfully", users });
    } catch (error) {
        console.error("Error fetching users", error);
        res.status(500).json({ message: "Failed to fetch users!" });
    }
});

// delete a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params; // รับ ID จาก URL params

        const user = await User.findByIdAndDelete(id); // ค้นหาผู้ใช้ตาม ID และลบออก

        if (!user) {
            return res.status(404).send({
                message: "User not found!" // หากไม่พบผู้ใช้
            });
        }

        res.status(200).send({
            message: "User deleted successfully!"
        });
        
    } catch (error) {
        console.error("Error deleting user", error);
        res.status(500).json({ message: "Error deleting user!" }); // ส่งข้อความผิดพลาด
    }
});

// update a user by ID
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params; // รับ ID จาก URL params
        const { role } = req.body; // รับข้อมูลใหม่จาก body

        // อัปเดตข้อมูลผู้ใช้
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });

        if (!user) {
            return res.status(404).send({
                message: "User not found!" // หากไม่พบผู้ใช้
            });
        }

        res.status(200).send({
            message: "User updated successfully!",
            user // ส่งข้อมูลของผู้ใช้ที่ถูกอัปเดตกลับ
        });
        
    } catch (error) {
        console.error("Error updating user", error);
        res.status(500).json({ message: "Error updating user!" }); // ส่งข้อความผิดพลาด
    }
});



module.exports = router;
