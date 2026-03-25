const axios = require('axios');
const cheerio = require('cheerio');
const axiosInstance = axios.create({headers:{'User-Agent': 'Mozilla/5.0'}});

async function run() {
    try {
        const fgRes = await axiosInstance.get('https://fitgirl-repacks.site/popular-repacks-of-the-year/');
        const $fg = cheerio.load(fgRes.data);
        console.log("FG TITLES:");
        $fg('.entry-content li a, .entry-content p strong a, .entry-content p a').each((i, el) => {
            let t = $fg(el).text().trim();
            if (t && t.length > 5 && i < 20) console.log("FG:", t);
        });
    } catch(e) {}

    try {
        const agRes = await axiosInstance.get('http://ankergames.net/trending');
        const $ag = cheerio.load(agRes.data);
        console.log("AG TITLES:");
        $ag('.woocommerce-loop-product__title, h2.woocommerce-loop-product__title, h3.product-title, .elementor-widget-heading .elementor-heading-title, .product h3').each((i, el) => {
             let t = $ag(el).text().trim();
             if (t && t.length > 5 && i < 20) console.log("AG:", t);
        });
    } catch(e) {}
}
run();
