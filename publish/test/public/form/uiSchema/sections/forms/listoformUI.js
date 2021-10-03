let listOfFormUI = [`INVOICE FORM	2D ARRAY	Puts 2D Array in InvoiceForm Sheet
    GET DATA	Spreadsheet ID, Named range	Get data from a specified range and include it in Response
    SET DATA	Spreadsheet ID, Sheet Name, array	Get Last Row from the Sheet and places data[array] after the last row
    UPDATE DATA	Spreadsheet ID, Named range,array	Updates Data in the sheet using array in the specified Named Range
    SEARCH FOLDER	FolderName	Searches a folder with FolderName. IF not found [ Response - Failed(Folder doesn't exist)]. IF Found send Folder name,id along with it's children through Response.
    GET GDRIVE FILE CONTENT	FileId	Takes in File ID of the file and returns content in the response
    UPDATE GDRIVE FILE CONTENT	FileId, content	Takes in File ID of the file and updates content of the file to (INPUT - content)`]