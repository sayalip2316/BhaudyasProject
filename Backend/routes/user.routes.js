const express=require("express");
const userRouter=express.Router();
const {UserModel}=require("../model/user.model")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

userRouter.post("/register", async (req, res) => {
    const { userName, email, password, PRN} = req.body

    try {
        isUserPresent = await UserModel.findOne({ email });
        if (isUserPresent) {
            return res.status(400).send({
                isError:true,
                message: "User Already Present Please Login..."
            });
        }

        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new UserModel({ userName, email, password: hash, PRN})
            await user.save();
            res.status(200).send({ 
                isError:false,
                message: "Registration Successfull..." 
            });
        });
    } catch (error) {
        res.status(401).send({ 
            isError:true,
            message: "Error occourd while  Registration please try after some time" 
        });

    }

})


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    let accesstoken = jwt.sign({ "userID": user._id }, 'accesstoken', { expiresIn: "7d" });
                    res.status(200).send({ 
                        isError:false,
                        message: "login successfull!!", 
                        token: accesstoken, 
                        user
                    })

                } else {
                    res.status(400).send({ 
                        isError:true,
                        message: "Wrong Password Please Provide Correct Password"
                    })
                }
            });
        } else {
            res.status(400).send({ 
                isError:true,
                message: "Wrong E-mail Please Provide Correct E-mail ID"
            })

        }
    } catch (error) {
        res.status(400).send({ 
            isError:true,
            message: "Something Went Wrong Please Try After Some Time"
        })

    }
})


userRouter.post("/admin/login", async (req, res) => {
   const {email,password}=req.body
   try {
    if(email==="sit@gmail.com" && password==="sit@123"){
        res.status(200).send({
            isError:false,
            message: "login successfull!!"
        })
    }else{
        res.status(400).send({ 
            isError:true,
            message: "Incorrect email or password"
        })
    }
   } catch (error) {
    res.status(400).send({ 
            isError:true,
            message: "Something Went Wrong Please Try After Some Time"
        })
   }
});

userRouter.get("/AllUsers",async(req,res)=>{
try {
    const users=await UserModel.find()
    res.status(200).json(users)
} catch (error) {
    res.status(400).send(error)
}
})
module.exports={userRouter}