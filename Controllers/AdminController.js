import Admin from "../models/AdminModel.js";
import Teacher from "../models/TeacherModel.js";
import Permissions from "../models/Permission.js";
import fs from "fs";
import NodeWebcam from "node-webcam";

import express from 'express';
import session from 'express-session';

 
export const createAdmin = async(req, res) =>{
    try {
        await Admin.create(req.body);
        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.message);
    }
}



export const AdminLogin = async (req, res) => {
  try {
    const facultyId = req.body.FacultyID;
    const password = req.body.Password;
    // const facultyId = "A45";
    // const password = "raheel123";

    const Details = await Admin.findOne({
      where: {
        facultyId: facultyId,
        Password: password,

      }
    });

    if (Details) {
      if (password === Details.Password) {
        req.session.facultyid = Details.FacultyID; // create session with FacultyID
        const userId = req.session.facultyid; // Access us
         console.log("session id in gettotal admin : ",userId);
        // req.session.save();
      // console.log("ajdncwd.l");
        // console.log("teacher ID is : ",req.session.facultyid);
        // res.status(200).json({ message: "login successful", facultyId: Details.facultyId });
        res.status(200).json({ message: "login successful"});

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

export const getTotalAdmin = async (req, res) => {
  // const userId = req.session.facultyid; // Access us
  // console.log("session id in gettotal admin : ",userId);
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

// export const GetPermissions= async(req, res) =>{
//   try {
//     const  facultyId  = req.params; // retrieve the facultyId from URL params
//       const response = await Permissions.findOne({
//         where:{
//           facultyId: facultyId
//       }
//       });
//       console.log(response);
//       res.status(200).json(response);
//   } catch (error) {
//       console.log(error.message);
//   }
// }
// export const GetPermissions = async (req, res) => {
//   try {
//     const { facultyId } = req.params; // retrieve the facultyId from URL params

//     const response = await Permissions.findOne({
//       where: {
//         facultyId: facultyId // Use the facultyId from URL params
//       }
//     });

//     if (!response) {
//       // No permissions found for the given faculty ID
//       return res.status(404).json({ error: 'Permissions not found' });
//     }

//     console.log(response);
//     res.status(200).json(response);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// };
export const GetPermissions = async (req, res) => {
  try {
    const { facultyId } = req.query; // Retrieve the facultyId from the query parameters
    // const { facultyId } = req.params; // Retrieve the facultyId from the query parameters

    const permissions = await Permissions.findOne({
      where: {
        facultyId: facultyId // Use the facultyId from the query parameters
      }
    });

    if (!permissions) {
      return res.status(404).json({ error: 'Permissions not found' });
    }

    console.log(permissions);
    res.status(200).json(permissions);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};



// export const CollectDataset= async (req, res) => {
//   try {
//     const folderName = req.body.folderName;
//      // Check if the folder already exists
//      if (fs.existsSync(folderName)) {
//       return res.status(400).json({ message: "Folder already exists" });
//     }
//     else
//     {
//    // Create a folder in the machine directory
//     fs.mkdirSync(folderName);
//     }
 

//     // Use node-webcam to capture 20 pictures with a 2-second delay
//     const Webcam = NodeWebcam.create({});

//     for (let i = 0; i < 20; i++) {
//       setTimeout(() => {
//         const timestamp = new Date().getTime();
//         const fileName = `${folderName}/image_${timestamp}.jpg`;
//         Webcam.capture(fileName, (err, data) => {
//           if (err) {
//             console.error(err);
//           } else {
//             console.log(`Image ${i + 1} captured`);
//           }
//         });
//       }, i * 2000);
//     }

//     res.json({ message: "Folder created successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to create folder" });
//   }
// }
// Express.js route to handle folder creation and image saving
export const CollectDataset=async (req, res) => {
  const folderName = req.body.folderName;
  const imageData = req.body.image.replace(/^data:image\/jpeg;base64,/, '');
  const imagePath = `dataset/${folderName}/image.jpg`;

  // Check if the folder name is provided
  if (!folderName) {
    return res.status(400).json({ error: 'Folder name is required.' });
  }

  // If the image data is not provided, assume it's a folder creation request
  if (!imageData) {
    const folderPath = `dataset/${folderName}`;

    // Check if the folder already exists
    if (fs.existsSync(folderPath)) {
      return res.status(400).json({ error: 'Folder already exists.' });
    }

    // Create the folder
    fs.mkdirSync(folderPath);

    return res.json({ message: 'Folder created successfully.' });
  }

  // Save the image
  fs.writeFile(imagePath, imageData, 'base64', (err) => {
    if (err) {
      console.error('Error saving image:', err);
      return res.status(500).json({ error: 'Failed to save image.' });
    }

    return res.json({ message: 'Image saved successfully.' });
  });
}


