/**
 * Run once from your project root:
 *   node scripts/download-images.js
 *
 * Downloads a high-res image for every place and saves it to
 * public/images/places/{id}.jpg
 *
 * Re-running skips files that already exist.
 *
 * Image sources:
 *  - Wikipedia Action API (pithumbsize=1200) for most places
 *  - Direct Wikimedia Commons URL for places whose Wikipedia
 *    article has no thumbnail registered (e.g. Golden Bay)
 */

import { createWriteStream, existsSync, mkdirSync } from "fs";
import { pipeline } from "stream/promises";
import path from "path";

const DEST_DIR = path.resolve("public/images/places");
const SIZE = 1200;

const COMMONS_BASE = "https://commons.wikimedia.org/wiki/Special:FilePath";

const places = [
    { id: "valletta", title: "Valletta" },
    { id: "mdina", title: "Mdina" },
    { id: "gozo", title: "Gozo" },
    { id: "dingli", title: "Dingli" },
    { id: "blueLagoon", title: "Comino" },
    {
        // Wikipedia article exists but has no thumbnail in the API.
        // Use a verified Wikimedia Commons file directly instead.
        id: "goldenBay",
        directUrl: `${COMMONS_BASE}/Golden_Bay_-_Mgarr_Malta.jpg?width=${SIZE}`,
    },
    { id: "marsaxlokk", title: "Marsaxlokk" },
    { id: "sliema", title: "Sliema" },
];

mkdirSync(DEST_DIR, { recursive: true });

async function getWikipediaImageUrl(title) {
    const url =
        "https://en.wikipedia.org/w/api.php" +
        `?action=query&titles=${encodeURIComponent(title)}` +
        `&prop=pageimages&piprop=thumbnail&pithumbsize=${SIZE}` +
        "&format=json&origin=*";

    const res = await fetch(url);
    const data = await res.json();
    const pages = data?.query?.pages || {};
    const page = Object.values(pages)[0] || {};
    return page?.thumbnail?.source || null;
}

async function downloadImage(imageUrl, destPath) {
    const res = await fetch(imageUrl, {
        redirect: "follow",
        headers: { "User-Agent": "malta-easy-app/1.0 (educational project)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} — ${imageUrl}`);
    await pipeline(res.body, createWriteStream(destPath));
}

async function main() {
    console.log(`Saving images to: ${DEST_DIR}\n`);

    for (const place of places) {
        const destPath = path.join(DEST_DIR, `${place.id}.jpg`);

        if (existsSync(destPath)) {
            console.log(`  ✓  ${place.id}.jpg already exists — skipping`);
            continue;
        }

        process.stdout.write(`  ↓  ${place.id}... `);

        try {
            // Use direct URL if provided, otherwise fetch from Wikipedia
            const imageUrl = place.directUrl
                ? place.directUrl
                : await getWikipediaImageUrl(place.title);

            if (!imageUrl) {
                console.log("no image found — skipping");
                continue;
            }

            await downloadImage(imageUrl, destPath);
            console.log("saved");
        } catch (err) {
            console.log(`FAILED — ${err.message}`);
        }
    }

    console.log("\nDone. Commit public/images/places/ to Git.");
}

main();
