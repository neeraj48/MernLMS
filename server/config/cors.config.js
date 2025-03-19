import cors from "cors";

const configureCors = () => {
  return cors({
    origin: (origin, callback) => {
      const allowOrigins = [
        "http://localhost:300", //local development
        "http://neeraj.com", // production
      ];

      if (!origin || origin.indexOf() !== -1) {
        callback(null, true); //giving permission to access api
      } else {
        callback(new Error("Not allowed by cors"));
      }
    },
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["X-Total-Count", "Content-Range"],
    credentials: true, //enable support for cookies
    preflightContinue: false,
    maxAge: 600, // cache preflight responses for 10 mins, avoid sending option response multiple times
    optionsSuccessStatus: 204,
  });
};

module.exports = { configureCors };
