import mongoose from "mongoose";
import { Schema, model } from 'mongoose';

const mentorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            default: null
        }
    ]
}, {
    timestamps: true
});

export const Mentor = model('Mentor', mentorSchema, "mentors");
