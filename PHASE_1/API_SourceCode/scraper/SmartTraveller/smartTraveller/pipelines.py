# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter

from sqlalchemy.orm import sessionmaker
from scrapy.exceptions import DropItem
from smartTraveller.models import Advice, Country, db_connect, create_table

from sqlalchemy import select

class SmarttravellerPipeline:
    def __init__(self):
        engine = db_connect()
        create_table(engine)
        self.Session = sessionmaker(bind=engine)

    def process_item(self, item, spider):
        session = self.Session()
        advice = Advice()

        advice.url = item['URL']
        
        result = session.query(Country).filter_by(name=item['country']).first()
        if (result):
            advice.country_id = result.country_id
        advice.continent = item['continent']
        advice.advice_level = item['adviceLevel']
        advice.latest_advice = item['latestAdvice']
        advice.last_update = item['lastUpdate']

        if not advice.latest_advice:
            return

        try:
            session.add(advice)
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()

        return item

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
        advice_exists = session.query(Advice).filter_by(url = item['URL']).first()
        session.close()

        if advice_exists:
            raise DropItem("Duplicate item found: %s" % item["URL"])
        else:
            return item
