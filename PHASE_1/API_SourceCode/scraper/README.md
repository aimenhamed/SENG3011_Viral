# Scrapy Spider for WHO Disease Outbreak News

A spider built with the scrapy library connected with Flask to deliver articles in JSON format.

## Setup

In this directory run the command:
```
pip install -r requirements.txt
```

## Commands

To start the server use either:
```
flask run
```
or
```
python3 app.py
```

To run the spider individually use:
```
scrapy crawl donSpider
```

## Endpoints

### /update

Starts a subprocess that runs the spider to crawl through all websites on https://www.who.int/emergencies/disease-outbreak-news/.

### /articles

Return the latest completed scrape of the website in JSON format.

**Return format:**
```
{
    'data'  : [
        {    
            'URL'                   : <String>,
            'Title'                 : <String>,
            'Date of publication'   : <String>,
            'Content'               : <String>
        },
        ...    
    ]
}

```

## Key Files:

```
app.py
```
Contains the flask server used to communicate with the spider.

```
WHODON_scraper/spiders/donSpider.py
```
Spider logic used to crawl through WHO's Disease Outbreak News.

```
out.json
```
The default JSON file sent by Flask through /articles.


```
small.json, large.json, large-prettified.json
```
small contains a small subsection of scraped articles.

large and large-prettified contains all scraped articles up to 21/02/2022. The prettified version is more readable.



