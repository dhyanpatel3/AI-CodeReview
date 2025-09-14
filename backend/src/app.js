const expreess = require("express");
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");

const app = expreess();

app.use(cors());

app.use(expreess.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Mount under /api to match Vercel route prefix
app.use("/api/ai", aiRoutes);

module.exports = app;
