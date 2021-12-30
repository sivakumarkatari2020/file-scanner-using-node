//scan all the file with its inner content also
//source folder - main
//destination folder - dest

const fs = require('fs').promises;
const constants = require('fs');

const textract = require('textract');
const PDFParser = require("pdf2json");

const WordExtractor = require("word-extractor"); 
const extractor = new WordExtractor();

const saveFiles = require('./controllers/saveFileDataController');
const {saveFileData} = saveFiles;

//file paths to various source & destination folders
const parentPath = "D:/file-scanner-LST";
const mainPath = parentPath+'/main';
const destFolder = parentPath+'/dest';

let count = 1;

async function scanFiles(folderName,destFolder){

    try{
        fs.mkdir(destFolder);
        const items = await fs.readdir(folderName, {withFileTypes : true});
    
        for(const item of items){
            if(item.isDirectory()){
                    await scanFiles(`${folderName}/${item.name}`,`${destFolder}/${item.name}`)
                } else {
                if(item.name.endsWith('.docx') || item.name.endsWith('.doc') || item.name.endsWith('.pdf') || item.name.endsWith('.DOCX') || item.name.endsWith('.DOC') || item.name.endsWith('.PDF')){
    
                    if(item.name.endsWith('.docx') || item.name.endsWith('.DOCX')){
    
                        textract.fromFileWithPath(`${folderName}/${item.name}`, async function( error, text ) {
                            if(text.match(/Contract/g) || text.match(/contract/g)){
                                fs.copyFile(`${folderName}/${item.name}`,`${destFolder}/${item.name}`,constants.COPYFILE_EXCL,(err) => {
                                    if (err) throw err;
                                    console.log("file copied!");
                                })
                                //const apiResult = await saveFileData({
                                //    'id' : count,
                                //    'f_name' : `${item.name}`,
                                //    'contents' : text,
                                //    'f_path' : `${destFolder}/${item.name}`
                                //});
                                //count++;
                                //if(apiResult[0] === 1 || apiResult[0] === '1'){
                                //    console.log("Successfully saved!");
                                //}
                                console.log("Reading DOCX file : " + `${folderName}/${item.name}`);
                            }    
                        });
                        
                    }
    
                    if(item.name.endsWith('.doc') || item.name.endsWith('.DOC')){

                        const extracted = extractor.extract(`${folderName}/${item.name}`)

                        extracted.then(function(doc) { 
                            const textData = doc.getBody();
                            if(textData.match(/Contract/g) || textData.match(/contract/g)){
                                fs.copyFile(`${folderName}/${item.name}`,`${destFolder}/${item.name}`,constants.COPYFILE_EXCL,(err) => {
                                    if (err) throw err;
                                    console.log("file copied!");
                                })
                            }
                            console.log("Reading DOC file : " + `${folderName}/${item.name}`);
                        });
                    
                    }
    
                    if(item.name.endsWith('.pdf') || item.name.endsWith('.PDF')){
    
                        let pdfParser = new PDFParser(this,1);
                        pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
                        pdfParser.on("pdfParser_dataReady", async pdfData => {
                            const textData = pdfParser.getRawTextContent();
                            if(textData.match(/Contract/g) || textData.match(/contract/g)){
                                fs.copyFile(`${folderName}/${item.name}`,`${destFolder}/${item.name}`,constants.COPYFILE_EXCL,(err) => {
                                    if (err) throw err;
                                    console.log("file copied!");
                                })
                                //const apiResult = await saveFileData({
                                //    'id' : count,
                                //    'f_name' : `${item.name}`,
                                //    'contents' : textData,
                                //    'f_path' : `${destFolder}/${item.name}`
                                //});
                                //count++;
                                //if(apiResult[0] === 1 || apiResult[0] === '1'){
                                //    console.log("Successfully saved!");
                                //}
                                console.log("Reading PDF file : " + `${folderName}/${item.name}`);
                            }
                        });
                        pdfParser.loadPDF(`${folderName}/${item.name}`);                
    
                    }
                }
            }
        }
    
        return 0;    
    } catch (err) {
        console.log(err);
    }
}

async function main() {
    const result = await scanFiles(mainPath,destFolder);
    console.log(result);
}

module.exports = {
    main
}
//D:\file-scanner-LST\main\00011917.The Fold Legal.Draft1.docx