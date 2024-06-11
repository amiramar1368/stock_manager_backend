import rateLimit from "express-rate-limit";

 const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: {
    success: false,
    body: null,
    message: `you reached to maximum allowed request per minutes. please try later`,
  },
  headers: true,
});

export default rateLimiter