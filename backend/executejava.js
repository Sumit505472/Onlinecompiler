import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (filePath) => {
  const jobId = path.basename(filePath).split(".")[0];
  const classDir = path.join(outputPath, jobId);

  if (!fs.existsSync(classDir)) {
    fs.mkdirSync(classDir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    exec(`javac -d "${classDir}" "${filePath}" && java -cp "${classDir}" ${jobId}`, (error, stdout, stderr) => {
      if (error) {
        return reject({ error, stderr });
      }
      if (stderr) {
        return reject(stderr);
      }
      if (stdout) {
        return resolve(stdout);
      }
    });
  });
};

export default executeJava;
