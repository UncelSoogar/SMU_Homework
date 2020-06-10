import datetime as dt
import numpy as np
import pandas as pd
from sqlalchemy import create_engine

class SQLHelper():

    def __init__(self):
        self.connection_string = f"sqlite:///Resources\hawaii.sqlite"
        self.engine = create_engine(self.connection_string)

    #query for precipitation data
    def getPrecipitation(self):
        query = """        
                    SELECT
                        m.date,
                        s.id as station_id,
                        s.station,
                        s.name,
                        m.prcp as precipitation
                    FROM
                        measurement as m
                    JOIN station as s ON s.station = m.station
                    ORDER BY m.date ASC
                """

        conn = self.engine.connect()
        df = pd.read_sql(query, conn)
        conn.close()

        return df

    #query to return list of stations
    def getStations(self):
        query = """
                    SELECT DISTINCT
                        station,
                        name
                    FROM
                        station
                """
        conn = self.engine.connect()
        df = pd.read_sql(query, conn)
        conn.close()

        return df

    #Query to return annual temp data from most active stations
    def getTOBS(self):
        query = """
                    SELECT
                        s.id as station_id,
                        s.station,
                        s.name,
                        m.date,
                        m.tobs as temp                   

                    FROM
                        station as s
                    JOIN measurement as m ON s.station = m.station
                    WHERE
                        station_id == 7
                        and m.date >= '2016-08-18'
                    ORDER BY
                        m.date ASC
                """
        conn = self.engine.connect()
        df = pd.read_sql(query, conn)
        conn.close()

        return df

    #Query to return temp aggs for set start date
    def startAggs(self, st_date):
        query = f"""
                    SELECT
                        date,
                        min(tobs) as min_temp,
                        avg(tobs) as avg_temp,
                        max(tobs) as max_temp
                    FROM
                        measurement
                    WHERE
                        date >= '{st_date}'
                    GROUP BY
                        date
                    ORDER BY 
                        date ASC
                """
        conn = self.engine.connect()
        df = pd.read_sql(query, conn)
        conn.close()

        return df

    #Query to return temp aggs between dates
    def getBetween(self, startDate, endDate):
        query = f"""
                    SELECT
                        date,
                        min(tobs) as min_temp,
                        avg(tobs) as avg_temp,
                        max(tobs) as max_temp
                    FROM
                        measurement
                    WHERE
                        date >= '{startDate}' 
                        and date <= '{endDate}'
                    GROUP BY
                        date
                    ORDER BY
                        date ASC
                """
        conn = self.engine.connect()
        df = pd.read_sql(query, conn)
        conn.close()

        return df

