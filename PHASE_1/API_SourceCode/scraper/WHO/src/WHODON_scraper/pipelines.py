# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import uuid
import re
from datetime import datetime
from sqlalchemy.orm import sessionmaker
from scrapy.exceptions import DropItem
from WHODON_scraper.models import Article, Report, db_connect, create_table, diseases, syndromes
import geograpy3
from  dateparser.search import search_dates


class WhodonScraperPipeline(object):
    def __init__(self):
        engine = db_connect()
        create_table(engine)
        self.Session = sessionmaker(bind=engine)

    def process_item(self, item, spider):
        session = self.Session()
        article = Article()

        # fill out article details
        article.article_id = uuid.uuid4()
        article.url = item['URL']
        article.headline = item['Title']
        article.main_text = item['Content']
        article.date_of_publication = item['Date of publication']
        reports = self.create_report_intermediate(article.article_id, article.main_text)

        # fallback if multi report generation fails
        if not reports:
            reports = self.create_report_basic(article.article_id, article.headline, article.date_of_publication, article.main_text)

        # commit results
        try:
            session.add(article)
            for report in reports:
                session.add(report)
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()

        return item
    
    
    def create_report_basic(self, article_id, title, date, main_text):
        """
        Generate a single report from an article.
        """
        reports = []

        d = {x for x in diseases() if x.lower() in main_text.lower()}
        s = {x for x in syndromes() if x.lower() in main_text.lower()}

        # fallback is publication date
        report_date = str(datetime.strptime(date,"%d %B %Y"))
        #  get a potential date from the first paragraph
        dates = search_dates(main_text.split('\n')[0])

        if dates:
            report_date = dates[0][1] # first found datetime in paragraph

        # grab country location from title
        match = r"[–-] (.*)$"
        p = re.compile(match)
        try:
            country = p.search(title).group(1)
        except:
            country = title
            raise Exception(f"could not extract from {country}")
            
        locations = [country]

        report = Report()
        report.diseases = list(d)
        report.syndromes = list(s)
        report.locations = locations
        report.event_date = report_date
        report.article_id = article_id

        reports.append(report)

        return reports
    
    def create_report_intermediate(self, article_id, main_text):
        '''
        Returns multiple reports of the article. May fail and return an empty list
        '''
        # create an empty set
        # split the main_text into paragraphs
        # comb through each paragraph for location, disease/syndrome and a date
        # compile a report and add them to the set.

        reports = set()

        paragraphs = main_text.split('\n')
        for p in paragraphs:
            # skip empty lines and headers since a header would have less than 30 characters
            if not p or len(p) < 30:
                continue
            
            # filters the paragraph for key terms
            d = {x for x in diseases() if x.lower() in p.lower()}
            s = {x for x in syndromes() if x.lower() in p.lower()}
            
            # we want to only keep paragraphs that have either diseases or syndrome entry
            if not (d or s):
                continue

            t = search_dates(p)
            p_date = None
            if t:
                p_date = t[0][1] # first found datetime in paragraph

            # we want to discard the entry of disease/syndromes if no event date was mentioned
            if not p_date:
                continue

            # excludes the "other" category from our report.
            geoPlaces = geograpy3.get_place_context(text=p)
            countries = geoPlaces.countries
            cities = geoPlaces.cities
            regions = geoPlaces.regions
            l = set(countries + cities + regions)

            #  location should not be empty
            if not l:
                continue

            # item creation
            report = Report()
            report.diseases = list(d)
            report.syndromes = list(s)
            report.locations = list(l)
            report.event_date = p_date
            report.article_id = article_id      

            reports.add(report)

        return reports

class DuplicatesPipeline(object):
    def __init__(self):
            """
            Initializes database connection and sessionmaker.
            Creates tables.
            """
            engine = db_connect()
            create_table(engine)
            self.Session = sessionmaker(bind=engine)
            # logging.info("****DuplicatesPipeline: database connected****")
    
    def process_item(self, item, spider):
        session = self.Session()
        article_exists = session.query(Article).filter_by(url = item['URL']).first()
        session.close()

        if article_exists:
            raise DropItem("Duplicate item found: %s" % item["URL"])
        else:
            return item