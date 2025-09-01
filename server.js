import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

// فعال کردن CORS
app.use(cors());

// متادیتاها رو از فایل JSON بخونیم
const rawData = fs.readFileSync("db.json");
const db = JSON.parse(rawData);

// مسیر برای گرفتن یک NFT بر اساس id
app.get("/nfts/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const nft = db.nfts.find((item) => item.id === id);

  if (!nft) {
    return res.status(404).json({ error: "NFT not found" });
  }

  res.json(nft);
});

// شروع سرور
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
