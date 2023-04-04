// const multer = require('multer');
import multer from 'multer';
// const XLSX = require('xlsx');
import XLSX from 'xlsx';
// const Excel = require('../models/excel.model');
// import Excel from "../models/ExcelModel";
import Excel from "../models/ExcelModel.js";
import { Op } from 'sequelize';
import moment from 'moment'; // to handle time
// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './downloads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

// Check if uploaded file is an Excel file
const excelFilter = function(req, file, cb) {
  if (!file.originalname.match(/\.(xlsx|xls)$/)) {
    return cb(new Error('Only Excel files are allowed!'), false);
  }
  cb(null, true);
};

// Initialize multer upload middleware
// const upload = multer({storage: storage, fileFilter: excelFilter});
const upload = multer({ 
  storage: storage, 
  fileFilter: excelFilter,
  limits: { fileSize: 5000000 } // 5MB limit
});







export const uploadExcel = async (req, res) => {
  let errorOccurred = false;
  try {
    upload.single('file')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(400).send('Error occurred while uploading file multer!');
        errorOccurred = true;
      }

      if (!req.file) {
        res.status(400).send('Please upload an Excel file!');
        errorOccurred = true;
      }

      if (!errorOccurred) {
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        data.forEach(row => {
          console.log(row.Starttime);
        });

        // Save data in database
        await Excel.bulkCreate(data);

        res.status(201).json({msg: "Data uploaded successfully!"});
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error!');
  }
};





  
  export const getTimetableData = async (req, res) => {
    try {
      const currentDate = new Date();
      const currentDay = currentDate.getDay(); // get current day of the week (0-6, where 0 is Sunday)
      const currentTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // get current time in HH:mm format
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDayName = days[currentDate.getDay()];
      const response = await Excel.findAll(
        {
          where:{
            [currentDayName]: "true",
          }
         

                //  order: [['Starttime', 'ASC']]

        }
      ); // Assuming you want to retrieve all Excel data
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error!');
    }
  };


//   export const getCurrentTimetable = async (req, res) => {
//     try {
//       const currentDate = new Date();
//       const currentDay = currentDate.getDay(); // get current day of the week (0-6, where 0 is Sunday)
//       const currentTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // get current time in HH:mm format
//       const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//       const tenMinutesLater = new Date(currentDate.getTime() + 10 * 60 * 1000); // 10 minutes later
//       // const tenMinutesLater= currentTime.getMinutes() + 10;
//       const now = new Date();
//       const hours = now.getHours();
//       const minutes = now.getMinutes();
//       const seconds = now.getSeconds();
// console.log("Ten minutes later",tenMinutesLater);
//       console.log("time check",`${hours}:${minutes}:${seconds}`);

//       const currentDayName = days[currentDate.getDay()];
//         console.log("current Day : ",currentDayName);
//         console.log("current time : ",currentTime);
//       const response = await Excel.findOne({
//         where: {
//           [currentDayName]: "true",
//           // Starttime: {
//           //   [Op.lt]: currentTime
//           // }
//           [Op.and]: [
//             { Starttime: { [Op.gte]: currentTime } },
//             // { Starttime: { [Op.lte]: tenMinutesLater } },
//             // {}
//           ]
//         },
//         // order: [['Starttime', 'DESC']]
//       });
//   console.log("log response : ",response);
//       if (!response) {
//         res.status(404).send("No matching row found");
//         return;
//       }
  
//       const startTime = new Date(response.Starttime);
//       // const tenMinutesLater = new Date(currentDate.getTime() + 10 * 60 * 1000); // 10 minutes later
  
//       const isButtonClickable =
//         startTime.getTime() === currentDate.getTime() ||
//         (currentDate < startTime && startTime < tenMinutesLater);
  
//       res.json({
//         isButtonClickable: isButtonClickable,
//         startTime: startTime.toISOString(),
//         data: response
//       });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send('Internal server error');
//     }
//   };
// -------------------------------------------------------------------------------
// export const getCurrentTimetable = async (req, res) => {
//   try {
//     // Get current time and day
//     const today = new Date();
//     const now = moment().format('hh:mm A');
//     const day = moment().format('dddd').toLowerCase();
//       const currentTime = moment().format('hh:mm A');
//       const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

//     // Fetch all rows from teacherTimetable table
//     const response = await Excel.findAll({
//                 where: {
//                     Starttime: {
//                         [Op.lte]: currentTime
//                     },
//                     [dayOfWeek]: "true"
//                 }
//             });

//     // Filter rows based on criteria
//     const filteredRows = response.filter(
//       (row) =>row.Starttime <= now && row[day] === "true"
//     );

//     // Construct response object with showButton flag
//     const responseObject = {
//       rows: filteredRows,
//       showButton: filteredRows.length > 0,
//     };

//     res.status(200).json(responseObject);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

 
export const getCurrentTimetable = async(req, res) =>{
  try {
      const today = new Date();
      const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const currentTime = moment().format('hh:mm A');
      const timetableEntries = await Excel.findAll({
          where: {
              Starttime: {
                  [Op.lte]: currentTime
              },
              [dayOfWeek]: "true"
          }
      });
      console.log("session  data is : ",req.session.facultyId);
      const filteredEntries = timetableEntries.filter(entry => {
          const startTime = moment(entry.Starttime, 'hh:mm A');
          const endTime = startTime.clone().add(10, 'minutes');
          const currentTime = moment();

          return currentTime.isBetween(startTime, endTime);
      });

      res.status(200).json(filteredEntries);
  } catch (error) {
      console.log(error.message);
  }
};
