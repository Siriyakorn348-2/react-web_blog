const express = require('express');
const Comment = require('../model/comment.model'); 
const router = express.Router();


// creat a comment
router.post('/post-comment',async(req,res) => {
    try{
    console.log(req.body)
    const newComment = new Comment(req.body)
    await newComment.save()
    res.status(200).send({ message: "Comment created successfully",
        comment: newComment})

    }catch (error) {
        console.error("Error creating comment: ", error.message); 
        res.status(500).send({
            message: "Error creating comment",
            error: error.message 
        })
    }
})

// get all comment count
router.get('/total-comments', async (req, res) => {
    try {
        // ใช้ countDocuments() เพื่อดึงจำนวนเอกสารทั้งหมดในคอลเล็กชัน Comment
        const totalComment = await Comment.countDocuments({});
        
        // ส่งผลลัพธ์กลับไปยัง client
        res.status(200).send({ 
            message: "Total comment count",  
            totalComment 
        });

    } catch (error) {
        console.error("Error occurred while getting comment count: ", error.message); // แสดงข้อผิดพลาดใน console
        res.status(500).send({
            message: "Error occurred while getting comment count",
            error: error.message // ส่งข้อผิดพลาดไปยัง client
        });
    }
});



module.exports = router;