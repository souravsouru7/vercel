// backend/src/infrastructure/db/MongoUserRepository.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserRepository = require('../../domain/repositories/UserRepository');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phoneNumber: String,
    isVerified: Boolean,
    otp: String,           
    otpExpires: Date,  
});

const UserModel = mongoose.model('User', userSchema);

class MongoUserRepository extends UserRepository {
    async createUser(user) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = new UserModel({
            ...user,
            password: hashedPassword,
        });
        return await newUser.save();
    }

    async findByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async updateUser(user) {
        return await UserModel.updateOne({ email: user.email }, user);
    }

    async verifyUser(email) {
        return await UserModel.updateOne({ email }, { isVerified: true });
    }

    async saveOtp(email, otp, otpExpires) {
        return await UserModel.updateOne({ email }, { otp, otpExpires });
    }

    async resetPassword(email, otp, newPassword) {
        const user = await UserModel.findOne({ email, otp, otpExpires: { $gt: new Date() } });
        if (!user) {
            throw new Error("Invalid or expired OTP");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = null;
        user.otpExpires = null;
        return await user.save();
    }
}

module.exports = MongoUserRepository;
