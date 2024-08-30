import fs from "fs";

const ROUTES = {
  HOME: { loc: "/", changefreq: "daily", priority: 1.0 },

  SIGNIN: { loc: "/sign-in", changefreq: "monthly", priority: 0.8 },
  SIGNUP: { loc: "/sign-up", changefreq: "monthly", priority: 0.8 },
  SIGNUP__OAUTH: { loc: "/sign-up/oauth", changefreq: "monthly", priority: 0.8 },

  PRODUCTS: { loc: "/products", changefreq: "daily", priority: 0.9 },
  MY: { loc: "/my", changefreq: "daily", priority: 0.9 },

  DASHBOARD: { loc: "/dashboard", changefreq: "daily", priority: 0.9 },
  DASHBOARD__PRODUCTS: { loc: "/dashboard/products", changefreq: "daily", priority: 0.9 },
};

const DOMAIN = process.env.VITE_DOMAIN_URL;

function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <!--  generated At ${new Date().toISOString()} -->
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n
  `;

  // Iterate over the routes and generate sitemap entries
  for (const [key, route] of Object.entries(ROUTES)) {
    const { loc, changefreq, priority } = route;
    const url = `${DOMAIN}${loc}`;
    const lastModified = new Date().toISOString();

    sitemap += `
    <url>
        <loc>${url}</loc>
        <lastmod>${lastModified}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>\n`;
  }
  sitemap += `</urlset>`;

  // Write the sitemap to a file
  // Replace 'sitemap.xml' with the desired filename and path
  fs.writeFileSync("./public/sitemap.xml", sitemap);
  console.log("Sitemap generated successfully!");
}

generateSitemap();
