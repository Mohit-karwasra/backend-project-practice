import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, // link from cloudinary or s3
            required: true,
        },
        coverImage: {
            type: String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Videos",
            },
        ],
        password: {
            type: String, // to be added after encryption
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

// hook to process data just before executing events (save, validate, remove, updateOne, deleteOne etc.) the data
// avoid using () => {} (arrow function) for callback because it does not have reference of "this"
userSchema.pre("save", async function (next) {
    // to check if password is modified or not
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hash(this.password, 10);
    next(); // to pass flag to next
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};
userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model("User", userSchema);

// password and username security
// bcrypt -> helps in hashing the password
// jwt (json web token) -> {bearer token} creating and decoding the tokens with algo
