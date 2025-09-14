// Build frontend reliably for Vercel, regardless of current working dir
const { execSync } = require("child_process");
const path = require("path");

function run(cmd, opts = {}) {
  execSync(cmd, { stdio: "inherit", ...opts });
}

const repoRoot = __dirname; // this file lives at repo root
const frontendDir = path.join(repoRoot, "frontend");

try {
  // Install and build the frontend
  run("npm ci", { cwd: frontendDir });
  run("npm run build", { cwd: frontendDir });
  console.log("Frontend built successfully.");
} catch (e) {
  console.error("Frontend build failed:", e);
  process.exit(1);
}
