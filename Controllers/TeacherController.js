// import Teacher from "../models/TeacherModel.js";
import Teacher from "../models/TeacherModel.js";




export const loginTeacher = async (req, res) => {
    try {

        const FacultyId=req.body.FacultyID;
        const Password=req.body.Password;

       const TeacherData= await Teacher.findOne({
        where:{
            facultyId:FacultyId,
            Password:Password
        }

       });
       if(TeacherData)
       {
        if(Password===TeacherData.Password)
        {
            // console.log("login succcessfull");
            // res.redirect('/Teacherdashboard');
             // Set user session

            // req.session.user = TeacherData;
            // res.cookie("FacultyId", TeacherData.facultyId);

            res.status(200).json({ message: "login successful" });
            // localStorage.setItem('key', FacultyId);

        }
        else{
            // res.render('login',{message:"email and password is incorrect"});

            res.status(401).json({ message: "email and password is incorrect" });

        }

       }
       else{
        // res.render('login',{message:"email and password is incorrect"});
        res.status(401).json({ message: "email and password is incorrect" });

       }
     
    } catch (error) {
        console.log(error.message);
      res.status(401).json({ error: error.message });
    }
  };


// export const GetLogin = async(req, res) =>{
//     const FacultyId=req.body.FacultyID;
//     const Password=req.body.Password;
//     try {
//         const response = await Teacher.findOne({
//             where:{
//                 facultyId:FacultyId,
//                 Password:Password
//             }
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         console.log(error.message);
//     }
// }
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


// export const getTeacherTotal = async(req, res) =>{
//     try {
//         const response = await Teacher.count();
//         res.status(200).json(response);
//     } catch (error) {
//         console.log(error.message);
//     }
// }
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

// export const updateTeacher = async(req, res) =>{
//     try {
//         await Teacher.update(req.body,{
//             where:{
//                 id: req.params.id
//             } 
//         });
//         res.status(200).json({msg: "User Updated"});
//     } catch (error) {
//         console.log(error.message);
//     }
// }

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
        const { id } = req.params;
        const { name, email, phone } = req.body;

        const teacher = await Teacher.findOne({ where: { id } });

        if (!teacher) {
            return res.status(404).json({ msg: "Teacher not found" });
        }

        teacher.name = name;
        teacher.email = email;
        teacher.phone = phone;

        await teacher.save();

        res.status(200).json({msg: "Teacher updated successfully", teacher });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: "Internal server error"});
    }
}
