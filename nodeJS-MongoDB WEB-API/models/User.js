const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName: String,
    email: String,
    password: String,
}, {
    timestamps: true // İsteğe bağlı olarak createdAt ve updatedAt alanları ekleyebilirsiniz.
});

const User = mongoose.model("User", userSchema);

module.exports = User; // Model adını baş harfi büyük olarak düzelttim.
