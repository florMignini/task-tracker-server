import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import { user } from "../interfaces/user-interface";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String,
    },
    confirm: {
        type: Boolean,
        default: false
    },
    profilePicture: {
        type: String,
        default: 'https://ichiidev.github.io/profile/assets/img/profile_picture.png' // Set a default URL for the profile picture
      },
},{
    timestamps: true
})

//hashing password
userSchema.pre('save', async function(next) {
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt)
   
});


//password comparison function
userSchema.methods.comparePassword = async function(candidatePassword:string) {
    return await bcrypt.compare(candidatePassword, this.password);
}

export const User = mongoose.models.User || mongoose.model<user>("User", userSchema);
