import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './configs/db.config';
import notesRouter from './routes/notes.route';

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());

app.use('/api/notes', notesRouter); // Mount routes

app.listen(port, () => console.log(`Server listening on port ${port}`));
