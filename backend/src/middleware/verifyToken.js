const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = async (req, res, next) => { 
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(403).send({ message: "No token provided!" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        
        // ตรวจสอบ decoded และ userId
        if (!decoded || !decoded.userId) {
            return res.status(401).send({ message: "Invalid token" });
        }

        // เก็บข้อมูล userId และ role ลงใน req
        req.userId = decoded.userId;
        req.userRole = decoded.role;  // เพิ่มการเก็บ role
        next(); 

    } catch (error) {
        console.error("Error verifying token", error.message);
        return res.status(401).send({ message: "Invalid token" });
    }
};

module.exports = verifyToken;
