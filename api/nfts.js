import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function handler(req, res) {
  try {
    const { id } = req.query;
    const dbPath = path.join(__dirname, "..", "db.json");
    const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    const nft = db.nfts.find((item) => item.id.toString() === id);
    if (!nft) {
      res.status(404).json({ error: "NFT not found" });
      return;
    }

    // فقط attributes را برگردان و xp/level اصلی را حذف کن
    const { xp, level, attributes, ...rest } = nft;

    const metadata = {
      ...rest,
      attributes: [
        ...(attributes || []),
        { trait_type: "XP", value: xp ?? 0 },
        { trait_type: "Level", value: level ?? 1 }
      ]
    };

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(metadata);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server crashed", details: err.message });
  }
}
