import mongoose from "mongoose";
import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mentor: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
        default: null
    }
}, {
    timestamps: true
});

export const Student = model('Student', studentSchema,"students");
