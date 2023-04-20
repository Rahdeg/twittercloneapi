interface AppConfig {
    apiKey: string;
    dbUrl: string;
    // Add other environment variables with their respective types
  }
  
  export const config: AppConfig = {
    apiKey: process.env.API_KEY!,
    dbUrl: process.env.DB_URL!,
    // Initialize other environment variables with their default values or retrieved values
  };