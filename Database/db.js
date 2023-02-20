import mongoose from "mongoose";

const Connection = async (username,password) => {
    const URL = `mongodb+srv://${username}:${password}@smartattendance.aoylvvi.mongodb.net/?retryWrites=true&w=majority`;
      //  const URL=`mongodb://ibrahim:<ibrahim>@ac-rnncsch-shard-00-00.txgaiy4.mongodb.net:27017,ac-rnncsch-shard-00-01.txgaiy4.mongodb.net:27017,ac-rnncsch-shard-00-02.txgaiy4.mongodb.net:27017/?ssl=true&replicaSet=atlas-9xs6jm-shard-0&authSource=admin&retryWrites=true&w=majority`;
  
    try {
      await mongoose.connect(URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      console.log("Database connected Successfully");
    } catch (error) {
      console.log("Error while connecting with Database ", error);
    }
  };
  
  export default Connection;