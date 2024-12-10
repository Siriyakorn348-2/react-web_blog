const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()

const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

//parse option
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));


//routes
const blogRoutes = require('./src/routes/blog.route');
const commentRoutes = require('./src/routes/comment.route');
const userRoutes = require('./src/routes/auth.user.route');

app.use("/api/auth",userRoutes)
app.use("/api/blogs",blogRoutes)
app.use("/api/comments",commentRoutes)




async function main() {
  await mongoose.connect(process.env.MONGODB_URL);

  app.get('/', (req, res) => {
    res.send('Hello World!  tommy');
  });
}
//linglingkwong
//NdInFls0rIDrTVrt

main().then(()=> console.log("Mogodb connected successfully ")).catch(err => console.log(err));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
