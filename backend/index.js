import express from "express";
import generateFile from "./generateFile.js";
import cors from "cors";
import executeCpp from "./executecpp.js";
import executeC from "./executec.js";
import executeJava from "./executejava.js";
import executePython from "./executepython.js";
const app=express();

//middleware
app.use(cors({ origin: "http://localhost:5173" })); 
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
        let output;
        switch(language){
            case "cpp":
                output=await executeCpp(filePath);
                break;
            case "c":
                output=await executeC(filePath);
                break;
            case "java":
                output=await executeJava(filePath);
                break;
            case "python":
                output=await executePython(filePath);
                break;
        }
        res.json({filePath,output});
        
    } catch (error) {
        console.error("Error in running code",error);
        return res.status(500).json({success:false,error:error.message});
        
    }

  
});
app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});