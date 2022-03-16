from sqlalchemy import create_engine, Column, Table, ForeignKey, MetaData
from sqlalchemy.orm import relationship

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import (
    Integer, String, Date, DateTime, Float, Boolean, Text)

from sqlalchemy.types import ARRAY
from sqlalchemy.dialects.postgresql import UUID
from scrapy.utils.project import get_project_settings

from uuid import uuid4


Base = declarative_base()

def db_connect():
    # local postgres user does not have a password so it is ommitted
    username = ""
    password = ""
    host = ""
    port = ""
    dbname = "" # also called path
    # f"postgresql://{username}:{password}@{host}:{port}/{dbname}"
    return create_engine(f"postgresql://{username}:{password}@{host}:{port}/{dbname}", echo=True, encoding="utf-8")

    # to make scraped data readable in the db, run the command in the db
    # set client_encoding to UTF8;

def create_table(engine):
    Base.metadata.create_all(engine)

class Article(Base):
    __tablename__ = "article"
    article_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    url = Column(String, nullable=False)
    headline = Column(String, nullable=False)
    date_of_publication = Column(String, nullable=False)
    main_text = Column(String, nullable=False)

class Report(Base):
    __tablename__ = "report"
    report_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    diseases = Column(ARRAY(String))
    syndromes = Column(ARRAY(String))
    event_date = Column(Date)
    locations = Column(ARRAY(String))
    article_id = Column(UUID(as_uuid=True), ForeignKey('article.article_id'))

def diseases():
    return ['unknown', 'other', 'anthrax cutaneous', 'anthrax gastrointestinous', 'anthrax inhalation', 'botulism', 'brucellosis', 
    'chikungunya', 'cholera', 'cryptococcosis', 'cryptosporidiosis', 'crimean-congo haemorrhagic fever', 'dengue', 'diphteria', 
    'ebola haemorrhagic fever', 'ehec (e.coli)', 'enterovirus 71 infection', 'influenza a/h5n1', 'influenza a/h7n9', 'influenza a/h9n2', 
    'influenza a/h1n1', 'influenza a/h1n2', 'influenza a/h3n5', 'influenza a/h3n2', 'influenza a/h2n2', 'hand, foot and mouth disease', 
    'hantavirus', 'hepatitis a', 'hepatitis b', 'hepatitis c', 'hepatitis d', 'hepatitis e', 'histoplasmosis', 'hiv/aids', 'lassa fever', 
    'malaria', 'marburg virus disease', 'measles', 'mers-cov', 'mumps', 'nipah virus', 'norovirus infection', 'pertussis', 'plague', 
    'pneumococcus pneumonia', 'poliomyelitis', 'q fever', 'rabies', 'rift valley fever', 'rotavirus infection', 'rubella', 'salmonellosis', 
    'sars', 'shigellosis', 'smallpox', 'staphylococcal enterotoxin b', 'thypoid fever', 'tuberculosis', 'tularemia', 'vaccinia and cowpox', 
    'varicella', 'west nile virus', 'yellow fever', 'yersiniosis', 'zika', 'legionares', 'listeriosis', 'monkeypox', 'COVID-19']

def syndromes():
    return ['Haemorrhagic Fever', 'Acute Flacid Paralysis', 'Acute gastroenteritis', 'Acute respiratory syndrome', 
    'Influenza-like illness', 'Acute fever and rash', 'Fever of unknown Origin', 'Encephalitis', 'Meningitis']