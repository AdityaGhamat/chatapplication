import dotenv from "dotenv";
dotenv.config();
export const ServerConfig = {
  PORT: process.env.PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  JWT_SECRET: process.env.JWT_SECRET,
  CLOUDINARY_SECRET_API: process.env.CLOUDINARY_SECRET_API,
  CLOUDINARY_KEY_API: process.env.CLOUDINARY_KEY_API,
  CLOUDINARY_ClOUD_NAME: process.env.CLOUDINARY_ClOUD_NAME,
};
