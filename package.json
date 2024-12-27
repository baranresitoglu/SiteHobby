import express from "express";
import cors from "cors";
import axios from "axios";
import { load } from "cheerio";

const app = express();
const PORT = 5001;

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running.");
});

app.get("/api/news/category/:category", async (req, res) => {
  const { category } = req.params;
  const url = `https://firatnews.com/${category}`;

  try {
    const response = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const html = response.data;
    const $ = load(html);

    const news = [];
    $(".entry-title a").each((index, element) => {
      const title = $(element).text().trim();
      const link = $(element).attr("href");

      const image = $(element).closest("div").find("img.img-responsive").attr("src");
      const fullImageUrl = image
        ? image.startsWith("http")
          ? image
          : `https://firatnews.com${image}`
        : "https://via.placeholder.com/150";

      news.push({
        title,
        link: `https://firatnews.com${link}`,
        image: fullImageUrl,
        description: "Pas de description disponible.",
      });
    });

    res.json(news);
  } catch (error) {
    console.error("Erreur lors de la récupération des actualités :", error.message);
    res.status(500).send("Erreur serveur.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
