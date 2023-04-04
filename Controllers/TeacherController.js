// import Teacher from "../models/TeacherModel.js";
import Teacher from "../models/TeacherModel.js";




// export const loginTeacher = async (req, res) => {
//     try {

//         const FacultyId=req.body.FacultyID;
//         const Password=req.body.Password;

//        const TeacherData= await Teacher.findOne({
//         where:{
//             facultyId:FacultyId,
//             Password:Password
//         }

//        });
//        if(TeacherData)
//        {
//         if(Password===TeacherData.Password)
//         {
//             // console.log("login succcessfull");
//             // res.redirect('/Teacherdashboard');
//              // Set user session

//             // req.session.user = TeacherData;
//             // res.cookie("FacultyId", TeacherData.facultyId);

//             res.status(200).json({ message: "login successful" });
//             // localStorage.setItem('key', FacultyId);

//         }
//         else{
//             // res.render('login',{message:"email and password is incorrect"});

//             res.status(401).json({ message: "email and password is incorrect" });

//         }

//        }
//        else{
//         // res.render('login',{message:"email and password is incorrect"});
//         res.status(401).json({ message: "email and password is incorrect" });

//        }
     
//     } catch (error) {
//         console.log(error.message);
//       res.status(401).json({ error: error.message });
//     }
//   };



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
          req.session.facultyId = teacherData.facultyId; // create session with facultyId
          req.session.save();
          console.log("teacher ID is : ",req.session.facultyId);
          res.status(200).json({ message: "login successful", facultyId: teacherData.facultyId });
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
  
  // in your app.js file, initialize session middleware before your routes
//   app.use(session({
//     secret: 'your_secret_key_here',
//     resave: false,
//     saveUninitialized: false,
//   }));





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





// export const updateTeacher =  async (req, res) => {
//     try {
//       const updatedTeacher = await Teacher.update(
//         {
//           // update the fields you want to change
//           name: req.body.name,
//           email: req.body.email,
//           phone: req.body.phone,
//           //...
//         },
//         {
//           where: {
//             id: req.params.id, // find the teacher by id
//           },
//         }
//       );
//       if (updatedTeacher[0] === 0) {
//         // if the teacher with that id does not exist
//         res.status(404).json({ msg: 'Teacher not found' });
//       } else {
//         res.status(200).json({ msg: 'Teacher updated successfully' });
//       }
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).json({ msg: 'Server error' });
//     }
//   };

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
