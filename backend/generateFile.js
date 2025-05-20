
import {fileURLToPath} from "url";
import fs from "fs";
import path from "path";
import {v4 as uuid} from "uuid";

//line 8 and line 9 define __filename and __dirname in ES modules
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);


const dirCodes=path.join(__dirname,"codes");//C:\Users\Sumit\Desktop\onlinecompiler\backend/codes
if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive:true});
}
const generateFile=(language,code)=>{
    const jobId=uuid();//48035b17-2522-492b-bc9b-a13425e16fa2
    //console.log(jobId);
    const filename=`${jobId}.${language}`;//48035b17-2522-492b-bc9b-a13425e16fa2.cpp
    const filePath=path.join(dirCodes,filename);//C:\Users\Sumit\Desktop\onlinecompiler/backend/codes/48035b17-2522-492b-bc9b-a13425e16fa2.cpp
     fs.writeFileSync(filePath,code);//write the code to the file(at filePath location)
    return filePath;

 
};
export default generateFile;
