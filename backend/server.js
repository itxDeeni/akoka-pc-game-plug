const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// A common user agent to prevent 403 Forbidden on some sites
const axiosInstance = axios.create({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
});

app.get('/api/games', async (req, res) => {
    const games = [];
    const addedTitles = new Set(); // For deduplication

    const addGame = (title, source, image, priceParam, sizeParam) => {
        // Remove trailing numbers with commas like '50,150' and 'downloads'
        let cleanTitle = title.split('\n')[0].replace(/\d{1,3}(,\d{3})+.*$/g, '').replace(/[0-9,]+\s*downloads.*/gi, '').replace(/\s+/g, ' ').trim();
        // Remove common repack suffixes if preferred, but keep it mostly original
        if (cleanTitle && !addedTitles.has(cleanTitle.toLowerCase())) {
            addedTitles.add(cleanTitle.toLowerCase());
            games.push({
                id: Math.random().toString(36).substr(2, 9),
                title: cleanTitle,
                source,
                image: image || 'placeholder.jpg',
                price: priceParam || '₦5,000',
                size: sizeParam || ''
            });
        }
    };

    try {
        // Scrape Ankergames (Trending exclusively)
        const agPages = Array.from({ length: 8 }, (_, i) => `http://ankergames.net/trending?page=${i + 1}`);

        const agPromises = agPages.map(async (url) => {
            try {
                const agRes = await axiosInstance.get(url, { timeout: 15000 });
                const $ag = cheerio.load(agRes.data);
                $ag('h2, h3').each((i, el) => {
                    let title = $ag(el).text().trim();
                    let image;
                    let p = $ag(el).parent();
                    for(let k=0; k<4; k++) {
                        image = p.find('img').attr('src');
                        if (image) break;
                        p = p.parent();
                    }
                    
                    const ignore = ['weekly popular games', 'top rising', 'about trending games', 'trending games', 'leave a reply'];
                    if (title && title.length > 3 && !ignore.some(w => title.toLowerCase().includes(w)) && games.length < 150) {
                        
                        let sizeText = '';
                        let pSize = $ag(el).parent();
                        for(let k=0; k<4; k++) {
                            const match = pSize.text().match(/([\d\.]+)\s*(GB|MB)/i);
                            if (match) {
                                sizeText = match[0];
                                break;
                            }
                            pSize = pSize.parent();
                        }
                        
                        let price = '₦5,000';
                        if (sizeText) {
                            let num = parseFloat(sizeText);
                            if (sizeText.toUpperCase().includes('MB')) {
                                price = '₦3,000';
                            } else if (sizeText.toUpperCase().includes('GB')) {
                                if (num >= 100) price = '₦9,999';
                                else if (num >= 50) price = '₦7,000';
                                else if (num >= 20) price = '₦5,000';
                                else price = '₦3,000';
                            }
                        }

                        addGame(title, 'Ankergames', image, price, sizeText);
                    }
                });
            } catch (e) {
                console.error(`Ankergames Error on ${url}:`, e.message);
            }
        });

        await Promise.all(agPromises);
    } catch (e) {
        console.error('Ankergames scrape error:', e.message);
    }

    // Shuffle the games to give a mixed grid
    for (let i = games.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [games[i], games[j]] = [games[j], games[i]];
    }

    res.json({ success: true, count: games.length, data: games });
});

app.listen(PORT, () => {
    console.log(`Backend scraper API running on http://localhost:${PORT}`);
});
