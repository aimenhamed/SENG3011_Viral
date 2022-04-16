# Scrapy Spider for WHO Disease Outbreak News

Source code for the spider built using scrapy that periodically writes into the database. Deployment not included.

## Setup

In this directory run the command:
```
pip install -r requirements.txt
```

## How to use

To run the crawler manually, you must first add the destination for the crawled data. Modify the destination of your database in src/WHODON_scraper/models.py and enter the database's URI.


Run the following command in the /src folder to initiate crawling:

```
scrapy crawl donSpider
```

You can terminate the crawler early with **Ctrl+C**.



