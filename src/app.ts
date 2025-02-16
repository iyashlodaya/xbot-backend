import express, { Request, Response } from 'express';
import sequelize from './db/models';

const app = express();
const port = process.env.PORT || 3000;

import authRoutes from "./routes/auth.routes";
import tweetRoutes from "./routes/tweet.routes";
import newsRoutes from "./routes/news.routes";

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running at port " + port);
});

app.use("/api/auth", authRoutes);
app.use("/api/tweet", tweetRoutes);
app.use('/api/news', newsRoutes);

// Check database connection
sequelize
.authenticate()
.then(() => {
  console.log("Database connected successfully.");
})
.catch((error: any) => {
  console.error("Unable to connect to the database:", error);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});