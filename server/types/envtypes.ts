import { z } from "zod";
import dotenv from "dotenv";
const envTypes = z.object({
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PORT: z.string().transform(Number),
  POSTGRES_HOST: z.string(),
  JWT_SECRET: z.string(),
  CLOUDINARY_SECRET_API: z.string(),
  CLOUDINARY_KEY_API: z.string(),
  CLOUDINARY_ClOUD_NAME: z.string(),
});
dotenv.config();
envTypes.parse(process.env);
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envTypes> {}
  }
}
