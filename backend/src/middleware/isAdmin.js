const isAdmin = (req, res, next) => {
    // ตรวจสอบว่า req.userRole มีการตั้งค่าเป็น 'admin' หรือไม่
    if (req.userRole !== 'admin') {
        return res.status(403).send({
            success: false,
            message: 'You are not allowed to perform this action. Please login as an admin.'
        });
    }
    // ถ้าเป็น admin ให้เรียก next() เพื่อดำเนินการต่อ
    next();
};

module.exports = isAdmin;
