const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt'); 
const { Schema }= require('mongoose');
const { use } = require('bcrypt/promises');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default : Date.now
      }
});

//hash password before svaeing to database
userSchema.pre('save',async function (next) {
    const user = this;
    if(!user.isModified('password')) 
        return next()
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword
    next()
})

//compare password when user tries to login
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User; 
