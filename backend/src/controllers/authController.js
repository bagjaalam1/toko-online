import jwt from "jsonwebtoken";
import User from "../models/User.js";

const TOKEN_TTL = "7d";

function sign(user) {
  return jwt.sign(
    { sub: user._id.toString(), username: user.username },
    process.env.JWT_SECRET || "dev-secret-change-me",
    { expiresIn: TOKEN_TTL }
  );
}

export const register = async (req, res, next) => {
  try {
    const { username, password, name } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username dan password wajib diisi" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password minimal 6 karakter" });
    }
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ message: "Username sudah dipakai" });
    }
    const passwordHash = await User.hashPassword(password);
    const user = await User.create({ username, passwordHash, name: name || "" });
    const token = sign(user);
    res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username dan password wajib diisi" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Username atau password salah" });
    }
    const ok = await user.verifyPassword(password);
    if (!ok) {
      return res.status(401).json({ message: "Username atau password salah" });
    }
    const token = sign(user);
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};
