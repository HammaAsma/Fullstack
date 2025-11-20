import app from "./app.js";
import config from "./config/config.js";
import open from "open";

app.listen(config.PORT_APP, () => {
  const url = `http://localhost:${config.PORT_APP}/`;
  console.log(`✓ Server running at ${url}`);
  open(url);
});
