import * as fetch from "node-fetch";
import * as cheerio from "cheerio";
import * as urlParser from "url";

const names: any[] = [];

const seenUrls = {};

const getUrl = (link, host, protocol) => {
  if (link.includes("http")) {
    return link;
  } else if (link.startsWith("/")) {
    return `${protocol}//${host}${link}`;
  } else {
    return `${protocol}//${host}/${link}`;
  }
};

const crawl = async ({ url, ignore }) => {
  if (seenUrls[url]) return;
  console.log("crawling", url);
  seenUrls[url] = true;

  const { host, protocol } = urlParser.parse(url);

  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const links = $("a")
    .map((i, link) => link.attribs.href)
    .get();

  const imageUrls = $("h1")
    .map((i, link) => link.children[0].data)
    .get();

    names.push(imageUrls);

  console.log(names);
  links
    .filter((link) => link.includes(host) && !link.includes(ignore))
    .forEach((link) => {
      crawl({
        url: getUrl(link, host, protocol),
        ignore,
      });
    });
};

crawl({
  url: "https://www.who.int/emergencies/disease-outbreak-news",
  ignore: "/search",
});
