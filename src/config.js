import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const config = {
    // The following is the URL to the API for production
    // API_URL: 'https://eco-friends-5tm5cvcguq-uc.a.run.app',
    // The following is the URL to the API for development
    API_URL: import.meta.env.VITE_API_URL,
};


export default config;