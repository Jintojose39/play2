


const ExcelJs =require('exceljs');
const workbook = new ExcelJs.Workbook();

async function readAndWriteExcel(filePath,searchValue,replaceValue)
 {
let targetRow;
let targetCol;
await workbook.xlsx.readFile(filePath)
const worksheet = workbook.getWorksheet('Sheet1');

worksheet.eachRow((row,rowNumber) => 
{
     row.eachCell((cell,colNumber)=>{

          if(cell.value === searchValue){
               targetRow = rowNumber;
               targetCol = colNumber;
               console.log(rowNumber);
               console.log(colNumber);
          }
          //console.log(cell.value);
     });

});
     const cell =worksheet.getCell(targetRow,targetCol)
     cell.value= replaceValue;
     await workbook.xlsx.writeFile('../utils/automationDummy.xlsx');
}

readAndWriteExcel('../utils/automationDummy.xlsx','Jhon','Jinto');


// const ExcelJs = require('exceljs');
// const workbook = new ExcelJs.Workbook();

// async function readExcel() {
//   await workbook.xlsx.readFile('../utils/automationDummy.xlsx');
  
//   const worksheet = workbook.getWorksheet('Sheet1'); // Or use index: getWorksheet(1)
//   if (!worksheet) {
//     console.error("❌ Sheet 'Sheet1' not found.");
//     return;
//   }

//   worksheet.eachRow((row, rowNumber) => {
//     console.log(`📄 Row ${rowNumber}:`);
    
//     row.eachCell((cell, colNumber) => {
//       console.log(`  📌 Column ${colNumber}: ${cell.value}`);
//     });
//   });
// }

// readExcel();
