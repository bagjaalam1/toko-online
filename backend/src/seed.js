import dns from "dns";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import User from "./models/User.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const sampleProducts = [
  {
    name: "Monstera Deliciosa",
    description: "Tanaman hias indoor populer dengan daun unik berlubang. Mudah dirawat, cocok untuk pemula.",
    price: 125000,
    stock: 15,
    category: "Indoor",
    image: "/images/monstera.jpg"
  },
  {
    name: "Philodendron Birkin",
    description: "Daun hijau dengan garis putih elegan, cocok diletakkan di ruang tamu atau kantor.",
    price: 85000,
    stock: 20,
    category: "Indoor",
    image: "/images/birkin.jpg"
  },
  {
    name: "Bougenville Pink",
    description: "Bunga mekar sepanjang tahun, tahan panas dan cocok untuk halaman rumah.",
    price: 65000,
    stock: 30,
    category: "Outdoor",
    image: "/images/bougenville.jpg"
  },
  {
    name: "Palem Kuning",
    description: "Palem hias dengan batang kuning keemasan, memberi kesan tropis pada taman.",
    price: 150000,
    stock: 10,
    category: "Outdoor",
    image: "/images/palem-kuning.jpg"
  },
  {
    name: "Echeveria Elegans",
    description: "Sukulen mungil berbentuk mawar dengan warna hijau kebiruan.",
    price: 35000,
    stock: 50,
    category: "Sukulen",
    image: "/images/echeveria.jpg"
  },
  {
    name: "Kaktus Mini Mix",
    description: "Paket 3 kaktus mini dalam pot kecil, cocok untuk meja kerja.",
    price: 45000,
    stock: 40,
    category: "Sukulen",
    image: "/images/kaktus.jpg"
  },
  {
    name: "Pot Terakota Klasik",
    description: "Pot tanah liat ukuran sedang, memberikan tampilan natural dan earthy.",
    price: 40000,
    stock: 60,
    category: "Pot & Aksesoris",
    image: "/images/terakota.jpg"
  },
  {
    name: "Sekop Mini Berkebun",
    description: "Set alat berkebun 3 pcs dari stainless steel dengan gagang kayu.",
    price: 55000,
    stock: 25,
    category: "Pot & Aksesoris",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800"
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    await Product.deleteMany({});
    console.log("Old products removed");
    await Product.insertMany(sampleProducts);
    console.log(`${sampleProducts.length} products inserted`);

    const existingAdmin = await User.findOne({ username: "admin" });
    if (existingAdmin) {
      console.log("Admin user already exists, skipping");
    } else {
      const passwordHash = await User.hashPassword("admin123");
      await User.create({ username: "admin", passwordHash, name: "Administrator" });
      console.log("Admin user created (admin / admin123)");
    }

    await mongoose.disconnect();
    console.log("Done");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
