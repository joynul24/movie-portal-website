// import express from "express";
// import path from "path";
// import cors from "cors";
// import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// // const PORT = 3000;

// app.use(cors({
//   origin: ["http://localhost:5173", "https://movie-portal-website.vercel.app"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type"]
// }));

// app.use(cors());
// app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.svgbh.mongodb.net/?appName=Cluster0`
// let client;

// if (uri) {
//   client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
// }

// let moviesCollection;
// let favoritesCollection;

// async function run() {
//   try {
//     // Only connect if URI is defined, otherwise let the routes fail gracefully for UI demonstration
//     if (uri && client) {
//       await client.connect();
//       const db = client.db("moviePortalDB");
//       moviesCollection = db.collection("movies");
//       favoritesCollection = db.collection("favorites");
//       console.log("Connected to MongoDB!");
//     } else {
//       console.log("No MongoDB URI provided. Skipping DB connection.");
//     }
//   } catch (error) {
//     console.error("MongoDB Connection Error:", error);
//   }
// }
// run();

// // API Routes
// app.get("/movies", async (req, res) => {
//   try {
//     const { search } = req.query;
//     let query = {};
//     if (search) {
//       query.title = { $regex: search, $options: "i" };
//     }
//     const result = await moviesCollection.find(query).toArray();
//     res.send(result);
//   } catch (error) {
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });

// app.get("/movies/featured", async (req, res) => {
//   try {
//     // Sort by rating descending and limit to 6
//     const result = await moviesCollection.find().sort({ rating: -1 }).limit(6).toArray();
//     res.send(result);
//   } catch (error) {
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });

// app.get("/movies/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     if (!ObjectId.isValid(id)) return res.status(400).send({ error: "Invalid ID" });
//     const query = { _id: new ObjectId(id) };
//     const result = await moviesCollection.findOne(query);
//     res.send(result);
//   } catch (error) {
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });

// app.post("/movies", async (req, res) => {
//   try {
//     const movie = req.body;
//     const result = await moviesCollection.insertOne(movie);
//     res.send(result);
//   } catch (error) {
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });

// app.put("/movies/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     if (!ObjectId.isValid(id)) return res.status(400).send({ error: "Invalid ID" });
//     const updatedMovie = req.body;
//     const filter = { _id: new ObjectId(id) };
//     const updateDoc = {
//       $set: {
//         poster: updatedMovie.poster,
//         title: updatedMovie.title,
//         genre: updatedMovie.genre,
//         duration: updatedMovie.duration,
//         releaseYear: updatedMovie.releaseYear,
//         rating: updatedMovie.rating,
//         summary: updatedMovie.summary,
//       },
//     };
//     const result = await moviesCollection.updateOne(filter, updateDoc);
//     res.send(result);
//   } catch (error) {
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });

// app.delete("/movies/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     if (!ObjectId.isValid(id)) return res.status(400).send({ error: "Invalid ID" });
//     const query = { _id: new ObjectId(id) };
//     const result = await moviesCollection.deleteOne(query);
//     // Also delete from favorites if needed
//     await favoritesCollection.deleteMany({ movieId: id });
//     res.send(result);
//   } catch (error) {
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });


// // Favorites Routes
// app.get("/favorites/:email", async (req, res) => {
//   try {
//     const email = req.params.email;
//     const result = await favoritesCollection.find({ userEmail: email }).toArray();
//     res.send(result);
//   } catch (error) {
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });

// app.post("/favorites", async (req, res) => {
//   try {
//     const favorite = req.body;
//     // Prevent duplicates
//     const query = { userEmail: favorite.userEmail, movieId: favorite.movieId };
//     const existing = await favoritesCollection.findOne(query);
//     if (existing) {
//       return res.status(400).send({ error: "Already in favorites" });
//     }
//     const result = await favoritesCollection.insertOne(favorite);
//     res.send(result);
//   } catch (error) {
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });

// app.delete("/favorites/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     if (!ObjectId.isValid(id)) return res.status(400).send({ error: "Invalid ID" });
//     const query = { _id: new ObjectId(id) };
//     const result = await favoritesCollection.deleteOne(query);
//     res.send(result);
//   } catch (error) {
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });

// // Setup Vite & Frontend serve
// async function startServer() {
//   if (process.env.NODE_ENV !== "production") {
//     // Dynamic import for vite
//     const { createServer: createViteServer } = await import("vite");
//     const vite = await createViteServer({
//       server: { middlewareMode: true },
//       appType: "spa",
//     });
//     app.use(vite.middlewares);
//   } else {
//     const distPath = path.join(process.cwd(), 'dist');
//     app.use(express.static(distPath));
//     app.get('/*', (req, res) => {
//       res.sendFile(path.join(distPath, 'index.html'));
//     });
//   }

// }

// app.get("/", (req, res) => {
//   res.send("Movie Portal server is running...");
// });

// startServer();
// export default app;




import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ CORS FIX (only once)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://movie-portal-website.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// ======================
// MongoDB Setup (FIXED)
// ======================

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.svgbh.mongodb.net/?appName=Cluster0`;

if (!uri) {
  console.error("❌ MONGODB_URI missing in .env / Vercel env");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

// Safe DB connection function (VERY IMPORTANT for Vercel)
async function getDB() {
  if (!db) {
    await client.connect();
    db = client.db("moviePortalDB");
    console.log("✅ MongoDB Connected");
  }
  return db;
}

// ======================
// API ROUTES
// ======================

// 🔥 GET ALL MOVIES
app.get("/movies", async (req, res) => {
  try {
    const db = await getDB();
    const moviesCollection = db.collection("movies");

    const { search } = req.query;

    let query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const result = await moviesCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// 🔥 FEATURED MOVIES
app.get("/movies/featured", async (req, res) => {
  try {
    const db = await getDB();
    const moviesCollection = db.collection("movies");

    const result = await moviesCollection
      .find()
      .sort({ rating: -1 })
      .limit(6)
      .toArray();

    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// 🔥 GET SINGLE MOVIE
app.get("/movies/:id", async (req, res) => {
  try {
    const db = await getDB();
    const moviesCollection = db.collection("movies");

    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ error: "Invalid ID" });
    }

    const result = await moviesCollection.findOne({
      _id: new ObjectId(id),
    });

    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// 🔥 ADD MOVIE
app.post("/movies", async (req, res) => {
  try {
    const db = await getDB();
    const moviesCollection = db.collection("movies");

    const movie = req.body;
    const result = await moviesCollection.insertOne(movie);

    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// 🔥 UPDATE MOVIE
app.put("/movies/:id", async (req, res) => {
  try {
    const db = await getDB();
    const moviesCollection = db.collection("movies");

    const id = req.params.id;
    const updatedMovie = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ error: "Invalid ID" });
    }

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
    res.status(500).send({ error: error.message });
  }
});

// 🔥 DELETE MOVIE
app.delete("/movies/:id", async (req, res) => {
  try {
    const db = await getDB();
    const moviesCollection = db.collection("movies");
    const favoritesCollection = db.collection("favorites");

    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ error: "Invalid ID" });
    }

    const result = await moviesCollection.deleteOne({
      _id: new ObjectId(id),
    });

    // remove from favorites also
    await favoritesCollection.deleteMany({ movieId: id });

    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// ======================
// FAVORITES ROUTES
// ======================

// 🔥 GET FAVORITES BY EMAIL
app.get("/favorites/:email", async (req, res) => {
  try {
    const db = await getDB();
    const favoritesCollection = db.collection("favorites");

    const email = req.params.email;

    const result = await favoritesCollection
      .find({ userEmail: email })
      .toArray();

    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// 🔥 ADD FAVORITE
app.post("/favorites", async (req, res) => {
  try {
    const db = await getDB();
    const favoritesCollection = db.collection("favorites");

    const favorite = req.body;

    const existing = await favoritesCollection.findOne({
      userEmail: favorite.userEmail,
      movieId: favorite.movieId,
    });

    if (existing) {
      return res.status(400).send({ error: "Already in favorites" });
    }

    const result = await favoritesCollection.insertOne(favorite);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// 🔥 DELETE FAVORITE
app.delete("/favorites/:id", async (req, res) => {
  try {
    const db = await getDB();
    const favoritesCollection = db.collection("favorites");

    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ error: "Invalid ID" });
    }

    const result = await favoritesCollection.deleteOne({
      _id: new ObjectId(id),
    });

    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// ======================
// BASIC ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("🎬 Movie Portal Server is Running...");
});

// ======================
// EXPORT FOR VERCEL
// ======================
export default app;