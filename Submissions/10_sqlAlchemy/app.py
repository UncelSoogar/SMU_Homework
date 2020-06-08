import datetime as dt
import numpy as np
import pandas as pd
import json

#My SQL Class I wrote
from sqlHelper import SQLHelper
from flask import Flask, jsonify

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

sqlHelper = SQLHelper()

#################################################
# Flask Routes
#################################################
@app.route("/api/v1.0/precipitation")
def precipitation():
    data = sqlHelper.getPrecipitation()
    return(jsonify(json.loads(data.to_json(orient='records'))))

#LIST OF STATIONS
@app.route("/api/v1.0/stations")
def stations():
    data = sqlHelper.getStations()
    return(jsonify(json.loads(data.to_json(orient='records'))))

#TEMPERATURE DATA FROM MOST ACTIVE STATION FOR LAST YEAR
@app.route("/api/v1.0/tobs")
def tobs():
    data = sqlHelper.getTOBS()
    return(jsonify(json.loads(data.to_json(orient='records'))))

#TEMP AGGS AFTER SPECIFIC DATE
@app.route("/api/v1.0/<start>")
def start(start):
    data = sqlHelper.startAggs(start)
    return(jsonify(json.loads(data.to_json(orient='records'))))

#TEMP AGGS BETWEEN SPECIFIC DATES
@app.route("/api/v1.0/<start>/<end>")
def startEnd(start, end):
    data = sqlHelper.getBetween(start, end)
    return(jsonify(json.loads(data.to_json(orient='records'))))




@app.route("/")
def home():
    return (
        f"Aloha and welcome to the Hawaiian weather archive. This archive is for those<br/>"
        f"of us who like to wear Hawaiian shirts, but aren't part of some weird militia.<br/>"
        f"Please fill your favorite Tiki mug with a variety of juices and rum as you<br/>"
        f"explore the weather of a place we'd all rather be: Hawaii."

        f"""
        <ul>
            <li><a target="_blank" href='/api/v1.0/precipitation'>Precipitation by date and station.</a></li>
            <li><a target="_blank" href='/api/v1.0/stations'>List of weather stations</a></li>
            <li><a target="_blank" href='/api/v1.0/tobs'>Temperature Data from station WAIHEE 837.5</a></li>
            <li><a target="_blank" href='/api/v1.0/2016-01-20'>Minimun, average, and maximum daily temperatures after Trump took office</a></li>
            <li><a target="_blank" href='/api/v1.0/2010-11-01/2011-10-28'>Minimum, average, and maximum daily temperatures between Texas Rangers World Series losses </a></li>
        </ul>
        """
    )


#################################################
# Flask Run
#################################################
if __name__ == "__main__":
    app.run(debug=True)
