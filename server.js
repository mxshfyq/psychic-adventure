require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const PORT = 3000;

const uri = process.env.MONGO_URI; // Use the environment variable
console.log("Mongo URI:", uri); // Log the Mongo URI to check if it's loaded

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// MongoDB connection setup
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("ecommerce"); // Ensure your database name is correct
    const productsCollection = db.collection("products");

    // Route to get all products
    app.get('/api/products', async (req, res) => {
      try {
        const products = await productsCollection.find({}).toArray();
        res.json(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "An error occurred while fetching products" });
      }
    });

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Call the connection function and keep the server running
connectToDatabase().catch(console.dir);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
