const { resolve } = require("path");
const readLine = require("readline");
const FileHandler =require('./FileHandler')

//createing FileHandler class instance
const fileHandler= new FileHandler()
//using readline i am taking input from cmd
const read = readLine.createInterface({
    input : process.stdin,
    output : process.stdout
 });

 //using promise with async and await approch i wait until user give input
 const readLineAsync = msg =>{
    return new Promise(resolve=>{
        read.question(msg,userRes=>{
            resolve(userRes)
        })
    })
 }

 //main funation where execution start
 const startApp = async()=>{
    const empFilepath =await readLineAsync("Enter employee file path : ")
    const preYearFilePath =await readLineAsync("Enter pre Year File path  : ")
    try{
    //for reading file
    const empData=fileHandler.readFile(empFilepath)
    const previousYeardata = fileHandler.readFile(preYearFilePath)
    //generating employee and it's secrete employee list
    const finalData = fileHandler.generate(empData,previousYeardata)
    //using output json generating excel file
    const resultpath=fileHandler.createExcelFile(finalData)
    console.log("final result file Path : "+resultpath)
    }
    catch(error){
        console.log("some error check file path try again : ")
        startApp()
    }
 }

 startApp()