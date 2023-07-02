/* ==> IMPORTS <== */
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const mongoose = require("mongoose");
const authenticateToken = require("./JWT");
const cookieParser = require("cookie-parser");
const UserModel = require("./models/user.model");

/* ==> CREATING A EXPRESS SERVER <== */
const app = express();

/* ==> DEPENDENCIES <== */
app.use(cors());
app.use(express.json());
app.use(cookieParser());

/* ==> MONGOOSE CONNECTION <== */
mongoose.connect(
  "mongodb+srv://vayunekbote02:eBspdohPycvqWXOH@cluster0.slrowcy.mongodb.net/?retryWrites=true&w=majority"
);

/* ENDPOINTS */
/* ==> Authentication Routes <== */
app.use("/api/auth", authRoutes);

/* TESTING AN ENDPOINT FOR AUTHENTICATION */
app.get("/api/user/:username", authenticateToken, async (req, res) => {
  try {
    // Getting from :username
    const { username } = req.params;
    // req.name is coming from middleware
    if (username !== req.name) {
      return res.json({ status: 403 });
    }

    // req.email is coming from middleware
    const user = await UserModel.find({ email: req.email });
    res.json({ status: 200, user });
  } catch (err) {
    res.json({ status: "error", error: "Failed to fetch user" });
  }
});

/* STARTING SERVER on PORT 8080 */
app.listen(8080, () => {
  console.log("server started.");
});
