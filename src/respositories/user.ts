import { appDataSource } from "../db/data-source.js";
import { User } from "../models/User.js";

export const userRepository = appDataSource.getRepository(User);
