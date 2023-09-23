const express=require("express")
const app=express();
const {connection}=require("./config/db");
const {userRouter}=require("./routes/user.routes");
const cors=require("cors");
const dotenv=require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/user",userRouter)


app.listen(process.env.PORT,async(req,res)=>{
    try {
       await connection
       console.log("Connected to db") 
       console.log(`Server is listening on port ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})