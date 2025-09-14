require("dotenv").config();
const app = require("./src/app");

// When running on Vercel (@vercel/node), export the app as the handler
// For local development, start the server on a port
if (process.env.VERCEL) {
  module.exports = app;
} else {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
