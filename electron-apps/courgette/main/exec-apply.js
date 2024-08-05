
/*
Must have exactly one of:
  -asm, -dis, -disadj, -gen or -apply, -genbsdiff or -applybsdiff.
Usage:
  courgette -dis <executable_file> <binary_assembly_file>
  courgette -asm <binary_assembly_file> <executable_file>
  courgette -disadj <executable_file> <reference> <binary_assembly_file>
  courgette -gen <v1> <v2> <patch>
  courgette -apply <v1> <patch> <v2>
*/
let { exec, spawn } = require("child_process");
const path = require("path")

const file1 = path.join(__dirname, "fileA/1.js")
const file2 = path.join(__dirname, "fileB/1.js")
const fileRes = path.join(__dirname, "fileResult/1.js")
const courgette = path.join(__dirname, "courgette.exe")
const result = path.join(__dirname, "patchResult/result.patch")


exec(`${courgette} -apply ${file1}  ${result} ${fileRes}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`apply Error: ${error}`);
      return;
    }
    console.log(`apply Output: ${stdout}`);
  });
