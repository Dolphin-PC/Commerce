import fs from "fs";

const DOMAIN = "http://localhost:5173";

function generateRobotsTxt() {
  const robotsTxt = `User-agent: *
  Sitemap: ${DOMAIN}/sitemap.xml
`;

  fs.writeFileSync("./public/robots.txt", robotsTxt);
  console.log("robots.txt generated successfully!");
}

generateRobotsTxt();
