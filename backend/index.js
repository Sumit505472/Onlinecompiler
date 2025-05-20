import express from "express";
import generateFile from "./generateFile.js";
import cors from "cors";
import executeCpp from "./executecpp.js";
const app=express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.json({message:"Hello World"});
});
app.post("/run",async(req,res)=>{

    const {language='cpp',code}=req.body;//destructuring
    if(!code){
        return res.status(400).json({success:false,error:"Code is required"});
    }
    try {
        const filePath=generateFile(language,code);
        const output= await executeCpp(filePath);//imported from executeCpp
        res.json({filePath,output});
        
        
    } catch (error) {
        console.error("Error in running code",error);
        return res.status(500).json({success:false,error:error.message});
        
    }

  
});
app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});