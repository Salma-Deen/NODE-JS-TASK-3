import express from "express";
import mongoose from "mongoose";
//import schema for mentor
import { Student } from "../schema/student.js";
import { Mentor } from "../schema/mentor.js";
import { v4 } from "uuid";
const studentRouter = express.Router();


//Getting All Students
studentRouter.get("/", async (req, res) => {
    const student = await Student.find({});
    res.json(student);
});
//Creating a New Student 
studentRouter.post("/", async (req, res) => {
    const studentDetail = req.body;
    const studentObj = new Student({
        ...studentDetail,
        id: v4() // Assigns a unique ID to the student
    });

    try {
        await studentObj.save();
        res.json({ msg: "student created successfully" });
    } catch (e) {
        console.log("Error in creating a student", e);
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).json({ msg: "Please check the fields for student creation" });
        } else {
            res.status(500).json({ msg: "Internal server Error" });
        }
    }
});

//Assign or Change Mentor for a Student
studentRouter.patch("/:id/assign-mentor", async (req, res) => {
    const studentId = req.params.id;
    const { mentorId } = req.body;

    if (!mentorId) {
        return res.status(400).json({ msg: "Mentor ID is required" });
    }

    try {
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(404).json({ msg: "Mentor not found" });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }

        student.mentor = mentorId;
        await student.save();

        if (!mentor.students.includes(studentId)) {
            mentor.students.push(studentId);
            await mentor.save();
        }

        res.json({
            msg: "Mentor assigned successfully",
            student: { id: student._id, name: student.name, email: student.email, mentor: student.mentor }
        });
    } catch (e) {
        console.error("Error assigning mentor:", e);
        res.status(500).json({ msg: "Internal server error" });
    }
});

//Get Student by ID
studentRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ msg: "student not found" });
        }

        res.json({
            msg: "student found",
            student: { id: student._id, name: student.name, email: student.email, mentor: student.mentor }
        });
    } catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});
// Assign Multiple Students to a Mentor
studentRouter.post("/assign-students/:id", async (req, res) => {
    const mentorId = req.params.id;
    const studentIds = req.body.studentIds;

    if (!studentIds || studentIds.length === 0) {
        return res.status(400).json({ msg: "Please provide student IDs" });
    }

    try {
        // Find the mentor
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(404).json({ msg: "Mentor not found" });
        }

        // Find students without a mentor
        const studentsWithoutMentor = await Student.find({ _id: { $in: studentIds }, mentor: null });

        // if (studentsWithoutMentor.length !== studentIds.length) {
        //     return res.status(400).json({ msg: "Some students already have a mentor" });
        // }

        // Assign the mentor to each student
        for (let student of studentsWithoutMentor) {
            student.mentor = mentorId;
            await student.save();
        }

        // Add students to mentor's list of students
        mentor.students.push(...studentsWithoutMentor.map(student => student._id));
        await mentor.save();

        res.json({
            msg: "Students successfully assigned to mentor",
            mentor: { id: mentor._id, name: mentor.name, email: mentor.email },
            students: studentsWithoutMentor
        });
    } catch (error) {
        console.error("Error assigning students:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Get students without a mentor
studentRouter.get("/no-mentor", async (req, res) => {
    try {
        // Import the Student model at the top of your file (if not already done)
        const studentsWithoutMentor = await Student.find({ mentor: null }); // Assuming mentor is an array

        // Respond with a success message and the list of students
        res.json({
            msg: "Available students",
            students: studentsWithoutMentor
        });
    } catch (error) {
        // Log the error and send a 500 response if there is a server issue
        console.error("Error fetching available students:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});
export default studentRouter;
