CLOUD DATABASE LINK:
https://node-js-task-3-6.onrender.com

******MENTOR******
1)Get All Mentor:GET-https://node-js-task-3-6.onrender.com/mentor
2)CREATE A MENTOR:POST-https://node-js-task-3-6.onrender.com/mentor
3)Show All Students for a Particular Mentor:GET-https://node-js-task-3-6.onrender.com/mentor/676ab6fbc8f35dce2a969312/students
4)Get a mentor by ID:GET-https://node-js-task-3-6.onrender.com/mentor/676ab6fbc8f35dce2a969312
  
  ******STUDENT*****
1)Get All Students:GET-https://node-js-task-3-6.onrender.com/student
2)Create A Student:POST-https://node-js-task-3-6.onrender.com/student
3)Assigning single student to single Mentor:PATCH-https://node-js-task-3-6.onrender.com/student/676ab6b0c8f35dce2a969307<STUDENT-ID>/assign-mentor
4)Adding multiple studies to a single Mentor:POST-https://node-js-task-3-6.onrender.com/student/assign-students/676ab6fbc8f35dce2a969312<MENTOR-ID>
5)Get a student by ID:GET-https://node-js-task-3-6.onrender.com/student/676ab6c9c8f35dce2a96930b<STUDENT-ID>
