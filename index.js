// server.js
import cors from "cors";
import express from "express";
import path from "path";
import signGenerator from "sign-generator"; // default import
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { createStamp } = signGenerator;

const app = express();
const port = process.env.PORT || 3010;

app.use(cors());

const fontsPath = path.join(__dirname, "public", "fonts");

app.use("/Fonts", express.static(fontsPath));

app.get("/api/sign/:text", async (req, res) => {
  try {
    const fonts = [
      "NanumGothicExtraBold.ttf",
      "hanjeonseo.ttf",
      "BMEULJIROTTF.ttf",
    ].map((value) => path.join(fontsPath, value));
    console.log("fonts:", fonts);
    console.log("Text:", req.params.text);
    const stampItems = await createStamp(req.params.text, fonts);
    res.status(200).send(stampItems);
  } catch (e) {
    console.error("Error generating sign:", e);
    res
      .status(500)
      .send({ error: "Failed to generate sign", details: e.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
