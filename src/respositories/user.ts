import { AppDataSource } from "../db/data-source.js";
import { User } from "../models/User.js";

export const userRepository = AppDataSource.getRepository(User);
