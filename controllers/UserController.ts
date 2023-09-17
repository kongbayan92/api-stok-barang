import * as express from "express";
const UserController = express.Router();
import { userQ } from "../config/database";
import { IUserSignin, IUser } from "../interfaces/IUser";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

UserController.post("" , async (req: express.Request, res: express.Response) => {
  try {
    const body: IUser = req.body;
    body.password = await bcrypt.hash(body.password as string, 10);
    await userQ.insert(body);
    return res.status(201).json(body);
  } catch (error) {
    return res.status(400).json({message: "Something when wrong!"});
  }
});

UserController.post("/signin", async (req: express.Request<{}, {}, IUser>, res: express.Response) => {
  try {
    const user: IUser = (await userQ.where({email: req.body.email}))[0]
    
    if (user.email && (await bcrypt.compare(req.body.password as string, user.password as string))) {
      const token: string = jwt.sign({
        email: user.email,
        status: user.status,
        username: user.username,
        kode: user.kode
      }, process.env.TOKEN_KEY as string, {expiresIn: "140h"});
      return res.status(200).json({token})
    }
    throw new Error();
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: "Something when wrong!"});
  }
});

export default UserController;