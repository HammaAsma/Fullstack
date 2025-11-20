import dotenv from "dotenv";
dotenv.config();

export default {
  PORT_APP: process.env.PORT_APP || 3000,
  MONGO_URL: process.env.MONGO_URL,
};
