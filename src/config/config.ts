require("dotenv").config();
interface AppConfig {
  apiKey: string;
  dbUrI: string;
  // Add other environment variables with their respective types
}

export const config: AppConfig = {
  apiKey: process.env.API_KEY!,
  dbUrI: process.env.DB_URI!,
  // Initialize other environment variables with their default values or retrieved values
};
