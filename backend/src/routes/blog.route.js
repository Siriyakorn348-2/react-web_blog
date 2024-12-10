const express = require('express');
const Blog = require('../model/blog.model'); 
const Comment = require('../model/comment.model'); 
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');
const router = express.Router();

// create a blog post
router.post("/create-post", verifyToken, isAdmin, async (req, res) => {
    try {
        const newPost = new Blog({ ...req.body, author: req.userId });
        await newPost.save(); // บันทึกข้อมูลลง MongoDB
        res.status(201).send({
            message: "Post created successfully",
            post: newPost
        });
    } catch (error) {
        console.error("Error creating post: ", error.message);
        res.status(500).send({
            message: "Error creating post",
            error: error.message
        });
    }
});


// get all blogs
router.get('/', async (req, res) => {
    try {
        const { search, category, location } = req.query;
        console.log(search);
 
        let query = {};
        if (search) {
            query = {
                ...query,
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { content: { $regex: search, $options: "i" } }
                ]
            };
        }

        if (category) {
            query = {
                ...query,
                category: category
            };
        }

        if (location) {
            query = {
                ...query,
                location: location
            };
        }

        const posts = await Blog.find(query).populate('author','email').sort({createdAt: -1});
        res.status(200).send(posts);

    } catch (error) {
        console.error("Error retrieving posts: ", error.message); // แสดงข้อผิดพลาด
        res.status(500).send({
            message: "Error retrieving posts",
            error: error.message // ส่งข้อผิดพลาดไปยัง client
        });
    }
});

// Get single blog by ID
router.get("/:id", async (req, res) => {
    try {
        const postId = req.params.id;

        // ดึงข้อมูลโพสต์จาก Blog model
        const post = await Blog.findById(postId);
        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        }

        // ดึงข้อมูลคอมเมนต์จาก Comment model ที่สัมพันธ์กับโพสต์
        const comments = await Comment.find({ postId: postId }).populate('user', 'username email');

        // ส่ง response กลับทั้งโพสต์และคอมเมนต์
        res.status(200).send({
            message: "Post retrieved successfully",
            post: post,
            comments: comments // ส่งคอมเมนต์ไปพร้อมโพสต์
        });

    } catch (error) {
        console.error("Error fetching single post: ", error.message);
        res.status(500).send({
            message: "Error fetching single post",
            error: error.message
        });
    }
});


// update a blog
router.patch("/update-post/:id",verifyToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = await Blog.findByIdAndUpdate(postId, {
            ...req.body
        }, { new: true });

        if (!updatedPost) {
            return res.status(404).send({ message: "Post not found" });
        }
        res.status(200).send({
            message: "Post updated successfully", // แก้ไขข้อความ
            post: updatedPost 
        });

    } catch (error) {
        console.error("Error updating post: ", error.message); // แสดงข้อผิดพลาด
        res.status(500).send({
            message: "Error updating post", 
            error: error.message
        });
    }
});

// delete a blog
router.delete("/:id",verifyToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedPost = await Blog.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).send({ message: "Post not found" });
        }

        //delete related comments
        await Comment.deleteMany({postId: postId})

        res.status(200).send({
            message: "Post deleted successfully",
            post: deletedPost // ส่งโพสต์ที่ถูกลบกลับไป
        });
    } catch (error) {
        console.error("Error deleting post: ", error.message); // แสดงข้อผิดพลาด
        res.status(500).send({
            message: "Error deleting post",
            error: error.message
        });
    }
});

// related posts
router.get("/related/:id",async (req, res) => {
    try {
        const { id } = req.params;

        // ตรวจสอบว่า id ถูกต้อง
        if (!id) {
            return res.status(400).send({ message: "Post id is required" });
        }

        // ค้นหาโพสต์ที่มี id ตรงกับ id ที่ระบุ
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).send({ message: "Post not found" });
        }

        // สร้าง regex สำหรับการค้นหาชื่อเรื่อง
        const titleKeywords = blog.title.split(' ').map(word => word.trim()).filter(word => word);
        const titleRegex = new RegExp(titleKeywords.join('|'), 'i'); // ใช้ 'i' สำหรับการค้นหาไม่สนใจตัวพิมพ์

        const relatedQuery = {
            _id: { $ne: id }, // ไม่รวมโพสต์หลัก
            title: { $regex: titleRegex } // ค้นหาจากชื่อเรื่อง
        };

        // ค้นหาโพสต์ที่เกี่ยวข้อง
        const relatedPost = await Blog.find(relatedQuery);

        res.status(200).send(relatedPost);
    } catch (error) {
        console.error("Error fetching related posts: ", error.message); // แสดงข้อผิดพลาด
        res.status(500).send({
            message: "Error fetching related posts",
            error: error.message
        });
    }
});


module.exports = router;
