import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import config from "../config/config";
import * as jwt from "jsonwebtoken";


class AuthController {
    static async login(req: Request, res: Response) {
        const {email, password} = req.body;
        if(!(email && password))return res.status(400).json({message: "Email & Password are required!"});
        let user : User
        const userRepo = AppDataSource.getMongoRepository(User);
        try{
           
              user = await userRepo.findOneOrFail({where: {email}});


        }catch(error){
            return res.status(400).json({message: "Email not found!"});
        }
        if(!user) return res.status(400).json({message: "Email not found!"});
        if(!user.checkPassword(password)) return res.status(400).json({message: "Password is incorrect!"});
        const token = jwt.sign({userId: user.id, email: user.email},config.jwSecret || process.env.JWT_secret, {expiresIn: "1h"});
        return res.status(200).json({message: "OK", token});
    }
}

export default AuthController;