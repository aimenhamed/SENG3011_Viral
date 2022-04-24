from scrapy import Spider, Request
from  html_text import extract_text


class smartTravellerSpider(Spider):
    name = 'smartTravellerSpider'
    allowed_domains = ['www.smartraveller.gov.au']
    start_urls = ['https://www.smartraveller.gov.au/destinations']


    def parse(self, response):
        for item in response.css("tr")[1::]:
            link = item.css("a::attr(href)").get()
            location = item.css("a::text").get()
            region = item.xpath('./td[@class="views-field views-field-field-region"]/a/text()').get()
            updated = item.xpath('./td[@class="views-field views-field-field-updated"]/time/@datetime').get()
            yield response.follow(url=link, callback=self.parse_article, meta={"link": link, "location": location, "region": region, "lastUpdate": updated})

    def parse_article(self,response):
        url = response.request.url
        location =  response.meta.get("location")
        region = response.meta.get("region")
        lastUpdate = response.meta.get("lastUpdate")
        adviceLevel = response.xpath('//div[@class="views-field views-field-field-overall-advice-level"]/div[@class="field-content"]/strong/text()').get()
        latestAdvice = response.xpath('//div[@class="views-field views-field-field-last-update"]/div[@class="field-content"]/span[@class="right"]/text()').get()

        if not latestAdvice:
            latestAdvice  = response.xpath('//div[@class="clearfix text-formatted field field--name-field-overview-introduction field--type-text-long field--label-hidden field__item"]/..').get()
            latestAdvice = extract_text(latestAdvice)

        yield  {
            "URL":  url,
            "country": location,
            "continent": region,
            "adviceLevel":  adviceLevel,
            "latestAdvice": latestAdvice,
            "lastUpdate": lastUpdate,
        }