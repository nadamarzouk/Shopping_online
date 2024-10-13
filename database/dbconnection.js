import mongoose from "mongoose";

export const dbconnection = () => {
         mongoose.connect("mongodb://E-com:Ecom@cluster0-shard-00-00.ouzwt.mongodb.net:27017,cluster0-shard-00-01.ouzwt.mongodb.net:27017,cluster0-shard-00-02.ouzwt.mongodb.net:27017/Shopping_Online?ssl=true&replicaSet=atlas-130fp7-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0")
         .then(conn => console.log(`DB conncted successfully on ${process.env.DB_CONNECTION}`))
         .catch(err => console.log(`DB connection failed: ${err}`)) 
}