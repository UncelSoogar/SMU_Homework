#import dependencies and scrapping app
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import martian_scrape

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
mongo = PyMongo(app)

#homepage, intial data
@app.route("/")
def index():
    mars = mongo.db.mars.find_one({"active": 1})
    return render_template('index.html', mars=mars)

#perform on button click

@app.route("/scrape")
def scrape():
    mars_app = mongo.db.mars
    mars = martian_scrape.mars_attacks()

    #Change previous entry to inactive

    mars_app.update_many(
        {'active': 1},
        {"$set": {'active': 0}
        }
    )

    #insert new data
    mars_app.insert_one(mars)

    #redirect to index
    return redirect('/')

if __name__ == "__main__":
    app.run()