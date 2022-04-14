from scrapy import Spider, Request

from html_text import extract_text

class donSpider(Spider):
    name = 'donSpider'
    allowed_domains = ['www.who.int']
    start_urls = ['https://www.who.int/emergencies/disease-outbreak-news/']
    
    def parse(self, response):
        # iterate through each article on page
        for a in response.css("a.sf-list-vertical__item"):
            link = a.css('a::attr(href)').get()
            title = a.css('span.trimmed::text').get()

            yield response.follow(url=link, callback=self.parse_article, meta={'URL': link, 'title':title})

        # finds the next page
        # no NEXT button so it searches for the li after the current active page
        next_page_url = response.xpath("//li[@class='active']/following-sibling::li/a/@href").extract_first()
        if next_page_url is not None:
            # add next page to the list of URLs being crawled
            yield Request(response.urljoin('https://www.who.int' + next_page_url))

    def parse_article(self, response):
        # extract article details
        url = response.meta.get('URL')
        headline = response.meta.get('title')
        dop = response.css("span.timestamp::text").extract_first()
        # grab the raw html
        content = response.xpath("//article[@class='sf-detail-body-wrapper']/..").get()
        # use html_text library to clean <a> and other modifiers
        clean = extract_text(content)
        yield {
            'URL' : url,
            'Title': headline,
            'Date of publication': dop,
            'Content': clean
        }