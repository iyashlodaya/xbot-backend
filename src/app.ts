import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Registration route
app.post('/register', (req: Request, res: Response) => {
    const { username, password } = req.body as { username: string; password: string };
    // Add registration logic here
    console.log(username, password);
    res.send('User registered successfully');
});

// Login route
app.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body as { username: string; password: string };
    // Add login logic here
    console.log(username, password);
    res.send('User logged in successfully');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});