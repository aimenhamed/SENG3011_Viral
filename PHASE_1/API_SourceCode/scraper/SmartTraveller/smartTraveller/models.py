from sqlalchemy import create_engine, Column, Table, ForeignKey, MetaData
from sqlalchemy.orm import relationship

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import (
    Integer, String, Date, DateTime, Float, Boolean, Text)
from sqlalchemy.types import ARRAY
from sqlalchemy.dialects.postgresql import UUID
from uuid import uuid4

Base = declarative_base()

def db_connect():
    # local postgres user does not have a password so it is ommitted
    username = ""
    password = ""
    host = ""
    port = ""
    dbname = "" # path
    # f"postgresql://{username}:{password}@{host}:{port}/{dbname}"
    return create_engine(f"postgresql://{username}:{password}@{host}:{port}/{dbname}", echo=True, encoding="utf-8")


    # to make it readable
    # set client_encoding to UTF8;

def create_table(engine):
    Base.metadata.create_all(engine)

class Advice(Base):
    __tablename__ = "advice"    
    advice_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    url = Column(Text, nullable=False)
    country_id = Column(UUID(as_uuid=True), ForeignKey('country.country_id'), nullable=True)
    continent = Column(Text, nullable=True)
    advice_level = Column(Text, nullable=True)
    latest_advice = Column(Text, nullable=True)
    last_update = Column(DateTime, nullable=False)

class Country(Base):
    __tablename__ = 'country'
    country_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(Text, nullable=False)
    code = Column(Text, nullable=False)
    coords = Column(ARRAY(Integer))
