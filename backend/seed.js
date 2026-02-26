const mongoose = require('mongoose');
const Furniture = require('./models/Furniture'); // Ensure this matches your model file name

// Use 127.0.0.1 to avoid IPv6 connection "hang" issues
mongoose.connect('mongodb+srv://gimhanisamanalee_db_user:2pDhF3jtXDIk2ugD@cluster0.bwxwzcl.mongodb.net/Auth?appName=Cluster0')
  .then(() => console.log("✅ MongoDB Connected for Seeding..."))
  .catch(err => console.error("❌ Connection Error:", err));

const seedItems = [
  {
    name: "L-Shape Corner Couch",
    type: "sofa",
    category: "Living Room",
    dimensions: { width: 200, depth: 80, height: 90 },
    material: "Premium Fabric",
    price: 185000,
    rating: 4.5,
    modelPath: "/assets/models/Sofa.glb",
    imagePath: "/assets/images/Sofa.png",
    description: "A sleek, comfortable sofa featuring premium velvet upholstery, perfect for modern Sri Lankan homes."
  },
  {
    name: "Grand Teak Dining Set",
    type: "table",
    category: "Dining Room",
    dimensions: { width: 180, depth: 90, height: 75 },
    material: "Solid Teak",
    price: 245000,
    rating: 5.0,
    modelPath: "/assets/models/Dining Set.glb",
    imagePath: "/assets/images/Dinning Set.png",
    description: "Handcrafted solid teak dining table with six matching chairs, built for a lifetime of family gatherings."
  },
  {
    name: "Mahogany Double Bed",
    type: "bed",
    category: "Bedroom",
    dimensions: { width: 160, depth: 200, height: 110 },
    material: "Mahogany",
    price: 135000,
    rating: 4.8,
    modelPath: "/assets/models/Bed.glb",
    imagePath: "/assets/images/Bed.png",
    description: "A classic mahogany bed frame with a minimalist headboard, blending durability with elegant design."
  },
  {
    name: "Modular FurnitureShelf",
    type: "storage",
    category: "Office",
    dimensions: { width: 120, depth: 35, height: 180 },
    material: "Hardwood",
    price: 55000,
    rating: 4.6,
    modelPath: "/assets/models/Shelf.glb",
    imagePath: "/assets/images/Shelf.png",
    description: "Sturdy hardwood bookshelf with adjustable shelving, ideal for organizing your home office or library."
  },
  {
    name: "Modern Velvet Sofa",
    type: "sofa",
    category: "Living Room",
    dimensions: { width: 220, depth: 150, height: 85 },
    material: "Linen Blend",
    price: 210000,
    rating: 4.7,
    modelPath: "/assets/models/Couch.glb",
    imagePath: "/assets/images/Couch.png",
    description: "A spacious L-shaped couch that maximizes seating while maintaining a compact, modern footprint."
  },
  {
    name: "Walnut Coffee Table",
    type: "table",
    category: "Living Room",
    dimensions: { width: 100, depth: 60, height: 45 },
    material: "Walnut Wood",
    price: 38500,
    rating: 4.4,
    modelPath: "/assets/models/Coffee Table.glb",
    imagePath: "/assets/images/Coffee Table.png",
    description: "Low-profile coffee table with a natural walnut finish, adding warmth to your living room arrangement."
  },
  {
    name: "Modern Chair",
    type: "chair",
    category: "Dining Room/Office",
    dimensions: { width: 160, depth: 90, height: 75 },
    material: "Linen & Steel",
    price: 115000,
    rating: 4.9,
    modelPath: "/assets/models/Chair.glb",
    imagePath: "/assets/images/Chair.png",
    description: "A contemporary dining table featuring tempered glass and a brushed steel base for a sophisticated look."
  },
  {
    name: "Kitchen Pantry Unit",
    type: "storage",
    category: "Kitchen",
    dimensions: { width: 90, depth: 60, height: 210 },
    material: "MDF White Gloss",
    price: 145000,
    rating: 4.3,
    modelPath: "/assets/models/Kitchen.glb",
    imagePath: "/assets/images/Kitchen.png",
    description: "High-capacity vertical storage unit with a gloss finish, perfect for modern kitchen organization."
  },

{
  name: "Classic Velvet Armchair",
  type: "chair",
  category: "Living Room",
  dimensions: { width: 85, depth: 80, height: 95 },
  material: "Velvet",
  price: 45000,
  rating: 4.7,
  modelPath: "/assets/models/Chair2.glb",
  imagePath: "/assets/images/Chair2.png",
  description: "A plush, high-back velvet armchair designed for ultimate comfort and classic style."
}
];

const seedDB = async () => {
  try {
    // Clear existing items to prevent duplicates during testing
    await Furniture.deleteMany({});
    
    // Insert the new valid items
    await Furniture.insertMany(seedItems);
    
    console.log("🚀 Database Seeded Successfully with 8 items!");
    process.exit(0); // Exit script cleanly
  } catch (err) {
    console.error("❌ Seeding Error:", err.message);
    process.exit(1);
  }
};

seedDB();