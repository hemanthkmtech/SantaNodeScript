class GenerateChildList{

    constructor(){
        //variable for employee currently choosen
        this.empSelectData=""
       
        //variable for child employee choosen for current employee 
        this.childSelectData=""
        //varibale for check current can have current child employee or not based on condition
        this.currentEmp=null;
        //final result of employee and it's child employee
        this.selectedList=[]
    }

    //main function to generate result 
    generate(data,priData){
      //loop for start from first employee to end in employee list file
        for(let currentEmp in data){
        this.empSelectData = data[currentEmp];
        //checking if priyear data present
        if(priData){
        let status=false;
        let childStatus=true;
        //checking for proper child employee for current employee
        while(childStatus){
            status=false;
            //choice employee randomly
            let id=Math.floor(Math.random() * data.length);
            id=id%data.length;
            this.childSelectData= data[id]
          for(let empData in priData){
            let currentData=priData[empData];
            //condtion for check employee and child are not same 
            if(currentData.Employee_EmailID == this.empSelectData.Employee_EmailID){
              //condition for child not present in previous year result file for same employee
                if(currentData.Secret_Child_EmailID == this.childSelectData.Employee_EmailID){
                    this.childSelectData="";
                    status=true;
                    break;
                }
            }
          }
          if(!status){
            childStatus=false; 
            }
        }
        //if child statify the consitions add the result in selectedList move for next employee
        if(!status){
        //
        this.selectedList.push({Employee_Name:this.empSelectData.Employee_Name,Employee_EmailID:this.empSelectData.Employee_EmailID,Secret_Child_Name:this.childSelectData.Employee_Name,Secret_Child_EmailID:this.childSelectData.Employee_EmailID});
        this.empSelectData="";
        this.childSelectData="";
        }
    }
    }
  return this.selectedList; 
}
}
module.exports=GenerateChildList