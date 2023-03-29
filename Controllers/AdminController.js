import Admin from "../models/AdminModel.js";
import Teacher from "../models/TeacherModel.js";




export const createAdmin = async(req, res) =>{
    try {
        await Admin.create(req.body);
        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.message);
    }
}

// export const getTotalAdmin = async (req, res) => {
//     try {
//       const total = await Admin.count({
//        where: {
//             Role: "Admin"
//         }
//       });
//       res.status(200).json({ total });
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

export const getTotalAdmin = async (req, res) => {
    try {
      const adminCount = await Admin.count({
        where: { Role: 'Admin' }
      });
      const coordinatorCount = await Admin.count({
        where: { Role: 'Coordinator' }
      });
      const supervisorCount = await Admin.count({
        where: { Role: 'Supervisor' }
      });
      const TeacherCount = await Teacher.count();
      res.status(200).json({ 
        adminCount: adminCount, 
        coordinatorCount: coordinatorCount, 
        supervisorCount: supervisorCount ,
        teacherCount: TeacherCount 

      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };

  export const getAdmins= async(req, res) =>{
    try {
        const response = await Admin.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
  
export const deleteAdmin = async(req, res) =>{
    try {
        await Admin.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}