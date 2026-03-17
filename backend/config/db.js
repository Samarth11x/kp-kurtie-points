import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Force grab the env variable or fallback explicitly if Render hasn't mounted it properly yet
    const uri = process.env.MONGO_URI || "mongodb+srv://kpadmin:%40Samarth11x@cluster0.ndzdheg.mongodb.net/kpkurtiepoint?retryWrites=true&w=majority&appName=Cluster0";
    
    if (!uri) {
      console.error("MONGO_URI IS CRITICALLY UNDEFINED. Halting.");
      process.exit(1);
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
