import { body } from "express-validator";
import { dbMySQLConfig } from "../config/database";

export const validateEmailRequired = () => body("email").notEmpty().bail().isEmail();

export const validateEmailNotExist = () => validateEmailRequired().bail().custom(async email => {
  const user = await dbMySQLConfig("user").where({email: email || ""});
  if (!user) {
    throw new Error('E-mail not exist');
  }
});

export const validateEmailExist = () => validateEmailRequired().bail().custom(async email => {
  const user = await dbMySQLConfig("user").where({email: email || ""});
  if (user) {
    throw new Error('E-mail already in use');
  }
});


export const validateUsernameRequired = () => body("username").notEmpty();

export const validateUsernameNotExist = () => validateUsernameRequired().bail().custom(async username => {
  const user = await dbMySQLConfig("user").where({username: username || ""});
  if (!user) {
    throw new Error('Username not exist');
  }
});

export const validateUsernameExist = () => validateUsernameRequired().bail().custom(async username => {
  const user = await dbMySQLConfig("user").where({username: username || ""});
  if (user) {
    throw new Error('Username already in use');
  }
});


