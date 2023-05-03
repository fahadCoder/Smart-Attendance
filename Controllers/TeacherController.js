// import Teacher from "../models/TeacherModel.js";
import Teacher from "../models/TeacherModel.js";

export const loginTeacher = async (req, res) => {
  try {
    const facultyId = req.body.FacultyID;
    const password = req.body.Password;

    const teacherData = await Teacher.findOne({
      where: {
        facultyId: facultyId,
        Password: password
      }
    });

    if (teacherData) {
      if (password === teacherData.Password) {
        let a=3;
        req.session.facultyid = a; // create session with facultyId
        req.session.save();
        console.log("teacher ID is : ",req.session.facultyid);
        res.status(200).json({ message: "login successful", facultyId: teacherData.facultyId });
        // localStorage.setItem("FacultyId",re/q.session.facultyid);
        // console.log("local storage ", localStorage.getItem("FacultyId"));

      } else {
        res.status(401).json({ message: "email and password is incorrect" });
      }
    } else {
      res.status(401).json({ message: "email and password is incorrect" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: error.message });
  }
};





export const getTeacher= async(req, res) =>{
    try {
        const response = await Teacher.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getTeacherById = async(req, res) =>{
    try {
        const response = await Teacher.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}



export const getTeacherTotal = async (req, res) => {
    try {
      const total = await Teacher.count();
      res.status(200).json({ total });
    } catch (error) {
      console.log(error.message);
    }
  }
  

export const createTeacher = async(req, res) =>{
    try {
        await Teacher.create(req.body);
        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.message);
    }
}


export const deleteTeacher = async(req, res) =>{
    try {
        await Teacher.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}


export const updateTeacher = async(req, res) =>{
    try {
        // const { id } = req.params;
        // const { name, email, phone } = req.body;

        const teacher = await Teacher.findOne({ where: {  id: req.params.id } });

        if (!teacher) {
            return res.status(404).json({ msg: "Teacher not found" });
        }

        // teacher.name = name;
        // teacher.email = email;
        // teacher.phone = phone;
        teacher.FacultyId=req.body.FacultyID;
        teacher.name=req.body.name;
        teacher.DOB=req.body.DOB;
        teacher.email=req.body.email;
        teacher.Password=req.body.Password;
        // teacher.gen=req.body.Gend;
        // teacher.adde=req.body.FacultyID;



        await teacher.update(req.body);

        res.status(200).json({msg: "Teacher updated successfully", teacher });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: "Internal server error"});
    }
}
