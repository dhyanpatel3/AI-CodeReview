const expreess = require("express");
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");

const app = expreess();

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow all origins by default; restrict via env ALLOWED_ORIGINS if provided
    const allowAll =
      !process.env.ALLOWED_ORIGENS && !process.env.ALLOWED_ORIGINS;
    if (allowAll) return callback(null, true);
    const list = (
      process.env.ALLOWED_ORIGINS ||
      process.env.ALLOWED_ORIGENS ||
      ""
    )
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!origin || list.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(expreess.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Health check for debugging/probes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Mount under /api to match Vercel route prefix
app.use("/api/ai", aiRoutes);
// Backward compatibility: also serve under /ai for direct backend domains
app.use("/ai", aiRoutes);

module.exports = app;
