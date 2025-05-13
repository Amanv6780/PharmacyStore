const express = require("express");
const { PORT } = require("./configs/Constants");
const { apiRouter } = require("./routes/apiRouter");
const { main } = require("./configs/dbConnect");
const cors = require('cors')

const app = express();
main();
app.use(cors())
app.use(express.json());
app.use("/api/v1", apiRouter);

app.listen(PORT, () => {
  console.log("running on " + PORT);
});
