process.on('uncaughtException',(err)=>{    
    console.log('erorrrrrrrrr',(err));
})

import express from "express"
import { dbconnection } from "./database/dbconnection.js";
import { init } from "./src/modules/index.routes.js";
import morgan from "morgan";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))

if(process.env.MODE == 'development'){
app.use(morgan('dev'))
}

init(app)

dbconnection()
    app.listen(process.env.PORT || port,()=> console.log(`server running in port ${port}...`))


 process.on('unhandledRejection',(err)=>{     
    console.log('unhandledRejection',(err));
})
