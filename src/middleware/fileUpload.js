
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { AppError } from '../utils/AppError.js'

let options = (folderName) =>{
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `uploads/${folderName}`)
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + '-' + file.originalname)
    }
  })

function fileFilter(req, file, cb){
  if(file.mimetype.startsWith('image')){
    cb(null, true)
  }else{
    cb(new AppError('image only', 400), false)
  }
}  
    return multer({ storage, fileFilter })
}


export const uploadSinglefile = (fieldName, folderName) => options(folderName).single(fieldName)
export const uploadMixOfFiles = (arrayOfFields, folderName) => options(folderName).fields(arrayOfFields)


   