const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Tüm kullanıcıları getir
const userList = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Kullanıcı listesi alınamadı" });
  }
}

// Kullanıcı ekle
const addUser = async (req, res) => {
  const { userName, email } = req.body;
  try {
    const newUser = new User({ userName, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Kullanıcı eklenirken hata:", error);
    res.status(500).json({ error: "Kullanıcı eklenirken hata oluştu" });
  }
}

// Kullanıcı güncelle
const updateUser = async (req, res) => {
  const { id } = req.body;
  const { userName, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { userName, email }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Kullanıcı güncellenirken hata:", error);
    res.status(500).json({ error: "Kullanıcı güncellenirken hata oluştu" });
  }
}

// Kullanıcı sil
const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }
    res.status(200).json({ message: "Kullanıcı başarıyla silindi" });
  } catch (error) {
    console.error("Kullanıcı silinirken hata:", error);
    res.status(500).json({ error: "Kullanıcı silinirken hata oluştu" });
  }
}

module.exports = {
  userList,
  addUser,
  updateUser,
  deleteUser
}
