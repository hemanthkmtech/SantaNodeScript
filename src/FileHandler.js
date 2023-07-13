const xlsx = require('xlsx')
const path = require('path')
const GenerateChildList = require('./GenerateChildList')
class FileHandler extends GenerateChildList{
//reading file return json data of that file
readFile(myFileName){
    const filePath= path.resolve(myFileName)
    const dataSheet  = xlsx.readFile(filePath);
    const xlSheetNames=dataSheet.SheetNames;
    const jsonData = xlsx.utils.sheet_to_json(dataSheet.Sheets[xlSheetNames[0]])
    console.log(jsonData)
    return jsonData;
}

//accept json obj and create excel file
createExcelFile(jsonData){
    const filePath=path.resolve(`${__dirname}/public`,"result.xlsx")
    let workSheet=xlsx.utils.json_to_sheet(jsonData)
    let workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook,workSheet,"employee");
    xlsx.writeFile(workbook,filePath)
    return filePath
}
//checking file path and resolve it
checkFilePath(filePath){
    try{
    const finalPath=path.resolve(filePath)
    return finalPath;
    }
    catch(error){
        return "not Found"
    }
}
}
module.exports=FileHandler