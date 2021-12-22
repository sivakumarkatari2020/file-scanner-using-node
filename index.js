//scan all the file with its inner content also
//source folder - main
//destination folder - dest

const fs = require('fs').promises;
const constants = require('fs');

const textract = require('textract');
const PDFParser = require("pdf2json");

const WordExtractor = require("word-extractor"); 
const extractor = new WordExtractor();

//file paths to various source & destination folders
const parentPath = "D:/file-scanner-LST";
const mainPath = parentPath+'/sample';
const destFolder = parentPath+'/dest';

async function findFiles(folderName,destFolder){

    fs.mkdir(destFolder);
    const items = await fs.readdir(folderName, {withFileTypes : true});

    for(const item of items){
        if(item.isDirectory()){
                await findFiles(`${folderName}/${item.name}`,`${destFolder}/${item.name}`)
        } else {
            if(item.name.endsWith('.docx') || item.name.endsWith('.doc') || item.name.endsWith('.pdf')){

                if(item.name.endsWith('.docx')){

                    textract.fromFileWithPath(`${folderName}/${item.name}`, async function( error, text ) {
                        if(text.match(/Contract/g)){
                            fs.copyFile(`${folderName}/${item.name}`,`${destFolder}/${item.name}`,constants.COPYFILE_EXCL,(err) => {
                                if (err) throw err;
                                console.log("file copied!");
                            })
                        }    
                    });
                    
                }

                if(item.name.endsWith('.doc')){

                    const extracted = extractor.extract(`${folderName}/${item.name}`);
                    extracted.then(function(doc) { 
                        const textData = doc.getBody();
                        if(textData.match(/Boston/g)){
                            fs.copyFile(`${folderName}/${item.name}`,`${destFolder}/${item.name}`,constants.COPYFILE_EXCL,(err) => {
                                if (err) throw err;
                                console.log("file copied!");
                            })
                        }    
                    });

                }

                if(item.name.endsWith('.pdf')){

                    let pdfParser = new PDFParser(this,1);
                    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
                    pdfParser.on("pdfParser_dataReady", pdfData => {
                        const textData = pdfParser.getRawTextContent();
                        if(textData.match(/Siva/g)){
                            fs.copyFile(`${folderName}/${item.name}`,`${destFolder}/${item.name}`,constants.COPYFILE_EXCL,(err) => {
                                if (err) throw err;
                                console.log("file copied!");
                            })
                        }
                        //console.log(typeof(textData));
                    });
                    pdfParser.loadPDF(`${folderName}/${item.name}`);                

                }
            }
        }
    }

    return ;
}

async function main() {
    const result = await findFiles(mainPath,destFolder);
    result.map( async file => {
        //const data = await fs.readFile(file,'utf-8');
        await fs.readFile(file,'utf-8');
        //const charArr = [];
        //data.map(char => charArr.push(char));
        //console.log('content : ' + data + ' --type : ' + typeof(data));
    })
}

main();
//D:\file-scanner-LST\main\00011917.The Fold Legal.Draft1.docx