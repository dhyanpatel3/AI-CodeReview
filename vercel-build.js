// vercel-build.js
// This script builds the frontend before Vercel deployment
const { execSync } = require("child_process");

try {
  execSync("cd frontend && npm install && npm run build", { stdio: "inherit" });
} catch (e) {
  console.error("Frontend build failed:", e);
  process.exit(1);
}
