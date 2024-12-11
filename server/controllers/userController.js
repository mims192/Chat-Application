import User from "../model/userModel.js";
import bcrypt, { compare } from 'bcrypt'
import jwtToken from '../utils/jwtwebToken.js'

export const userRegister=async(req,res)=>{
    try{
       const{fullname,username,email,password,gender,profilepic}=req.body;
       const user=await User.findOne({username,email});
       if(user){return res.status(400).send({ success: false, message: "Username or Email already exists" })};
       const hashPassword=bcrypt.hashSync(password,10);
       const profileBoy = profilepic || `https://avatar.iran.liara.run/public/boy?username=${username}`;
       const profileGirl = profilepic || `https://avatar.iran.liara.run/public/girl?username=${username}`;

       const newUser=new User({
        fullname,
        username,
        email,
        password:hashPassword,
        gender,
        profilepic:gender==="male"?profileBoy:profileGirl
       })

       if(newUser){
        await newUser.save();
        jwtToken(newUser._id,res);
       }else{
        res.status(500).send({ success: false, message: "Inavlid User Data" })
       }
       res.status(201).send({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilepic: newUser.profilepic,
        email: newUser.email,
       })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);

    }
}

export const userLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email})

        if(!user) return res.status(500).send({ success: false, message: "Username or Email do not exists" })
        const comparePass=bcrypt.compareSync(password,user.password || "");
    if(!comparePass) return res.status(500).send({ success: false, message: "password dont match" }) 
       
        jwtToken(user._id,res)
        res.status(200).send({    //sending in frontend
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilepic: user.profilepic,
            email: user.email,  
            message:"Successfully login"
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);

    }
}
export const userLogout=async(req,res)=>{
    try{
        res.cookie("jwt",'',{          //delete the jwt token to log out and set maxage zero means login period gets zero..........jwt token replaced by blank string
            maxAge:0
        })
        res.status(200).send({success:true ,message:"User LogOut"})

    }
    catch(error){
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}

