import express from "express";
import path from "path";
import cors from "cors";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
let client;

if (uri) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
}

let moviesCollection;
let favoritesCollection;

async function run() {
  try {
    // Only connect if URI is defined, otherwise let the routes fail gracefully for UI demonstration
    if (uri && client) {
      await client.connect();
      const db = client.db("moviePortalDB");
      moviesCollection = db.collection("movies");
      favoritesCollection = db.collection("favorites");
      console.log("Connected to MongoDB!");
    } else {
      console.log("No MongoDB URI provided. Skipping DB connection.");
    }
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
}
run();

// API Routes
app.get("/api/movies", async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    const result = await moviesCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/api/movies/featured", async (req, res) => {
  try {
    // Sort by rating descending and limit to 6
    const result = await moviesCollection.find().sort({ rating: -1 }).limit(6).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/api/movies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).send({ error: "Invalid ID" });
    const query = { _id: new ObjectId(id) };
    const result = await moviesCollection.findOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/api/movies", async (req, res) => {
  try {
    const movie = req.body;
    const result = await moviesCollection.insertOne(movie);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.put("/api/movies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).send({ error: "Invalid ID" });
    const updatedMovie = req.body;
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: {
        poster: updatedMovie.poster,
        title: updatedMovie.title,
        genre: updatedMovie.genre,
        duration: updatedMovie.duration,
        releaseYear: updatedMovie.releaseYear,
        rating: updatedMovie.rating,
        summary: updatedMovie.summary,
      },
    };
    const result = await moviesCollection.updateOne(filter, updateDoc);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.delete("/api/movies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).send({ error: "Invalid ID" });
    const query = { _id: new ObjectId(id) };
    const result = await moviesCollection.deleteOne(query);
    // Also delete from favorites if needed
    await favoritesCollection.deleteMany({ movieId: id });
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Favorites Routes
app.get("/api/favorites/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await favoritesCollection.find({ userEmail: email }).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/api/favorites", async (req, res) => {
  try {
    const favorite = req.body;
    // Prevent duplicates
    const query = { userEmail: favorite.userEmail, movieId: favorite.movieId };
    const existing = await favoritesCollection.findOne(query);
    if (existing) {
      return res.status(400).send({ error: "Already in favorites" });
    }
    const result = await favoritesCollection.insertOne(favorite);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.delete("/api/favorites/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).send({ error: "Invalid ID" });
    const query = { _id: new ObjectId(id) };
    const result = await favoritesCollection.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Setup Vite & Frontend serve
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Dynamic import for vite
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
