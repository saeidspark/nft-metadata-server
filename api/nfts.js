import fs from "fs";

export default function handler(req, res) {
  const { id } = req.query;

  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const nft = db.nfts.find((item) => item.id.toString() === id);

  if (!nft) {
    res.status(404).json({ error: "NFT not found" });
    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(nft);
}
