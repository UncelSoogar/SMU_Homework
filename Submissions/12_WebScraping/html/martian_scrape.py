#import dependencies
from bs4 import BeautifulSoup
import pandas as pd
from splinter import Browser
import datetime as datetime
import time
import json
import re

#scrapping function

def mars_attacks ():
    #S/U chromedriver. Change headless after testing
    executable_path = {'executable_path':"C:/Users/slapp/Desktop/SMU_Homework/Submissions/12_WebScraping/resources/chromedriver.exe"}
    browser = Browser('chrome', **executable_path, headless=True)
    
    #Navigate to scrape news page. Pause for 1 second before grabbing data.
    url = "https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest"
    browser.visit(url)
    time.sleep(2)
    html = browser.html
    soup = BeautifulSoup(html, 'lxml')
    #Grab Headline, Abstract, and URL.
    articles= soup.find_all(class_ = "slide")
    headline = articles[0].find(class_= "content_title").text.replace("\n", "")
    abstract = articles[0].find(class_ = "rollover_description_inner").text.replace("\n", "")
    articleURL = f"https://mars.nasa.gov{articles[0].find(class_ = 'content_title').a['href']}"

    #Navigate to scrape feature image
    img_url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(img_url)
    time.sleep(2)
    html = browser.html
    soup = BeautifulSoup(html, 'lxml')
    #Grab img url, clean and add to base url
    images = soup.find_all(class_ = 'carousel_item')
    img_url = "https://www.jpl.nasa.gov" + images[0]['style'].split("'")[1]

    #Navitage to scrape weather from tweeterz. Eww, David.
    #scrap mars weather from tweeterz
    tweet_url = "https://twitter.com/marswxreport?lang=en"
    browser.visit(tweet_url)
    time.sleep(2)
    html = browser.html
    soup = BeautifulSoup(html, 'lxml')
    #collect all spans to find tweets
    spans = soup.find_all('span')
    #loop through spans and conditional statement to find tweet
    tweeterz = ""
    for tweet in spans:
        if 'InSight sol' in tweet.text:
            tweeterz = tweet.text
            #break loop after condition is met
            break
    #collect all a's and loop through conditionals to find tweet url.
    oaklandAs = soup.find_all('a')
    tweetbook = ''
    for link in oaklandAs:
        if 'status' in link['href']:
            tweetbook = 'https://www.twitter.com' + link['href']
            break

    #Navigate to scrape table from facts page
    facts_url = "https://space-facts.com/mars/"
    browser.visit(facts_url)
    time.sleep(2)
    html = browser.html
    soup = BeautifulSoup(html, 'lxml')
    #read html tables into df. Select table and rename columns
    df_list = pd.read_html(html)
    df_list[0].columns = ['Fact', 'Value']
    #convert to html and json
    fact_html = df_list[0].to_html(index=False)
    fact_json = json.loads(df_list[0].to_json(orient='records'))
    #change styling on html table
    fact_html = fact_html.replace('class="dataframe"', 'class="table table-hover"')

    #Navigate to hemisphere page.
    hemiURL = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(hemiURL)
    time.sleep(2)
    html = browser.html
    soup = BeautifulSoup(html, 'lxml')
    #Scrape url for each hemisphere page. Loop to create full url
    hemipages = soup.find_all(class_ = 'item')
    hemi_urls = []
    for page in hemipages:
        hemi_urls.append("https://astrogeology.usgs.gov/" + page.find('a')['href'])
    #Loop through each page to scrape title and img url.
    hemi_titles = []
    hemi_imgs = []
    for link in hemi_urls:
        browser.visit(link)
        time.sleep(2)
        html = browser.html
        soup = BeautifulSoup(html, 'lxml')
        hemi_titles.append(soup.title.text.split(" |")[0])
        hemi_imgs.append(soup.find(class_ = 'downloads').find('a')['href'])
    hemis = {'title': hemi_titles, 'hemi_img_url': hemi_imgs}

    #close browser
    browser.quit()

    #Store data in a dictionary and return
    rtnDict = {
        'news_headline': headline,
        'news_abstract': abstract,
        'news_url': articleURL,
        'feature_img': img_url,
        'tweet': tweeterz,
        'tweet_url': tweetbook,
        'facts': fact_html,
        'json_facts': fact_json,
        'hemispheres' : hemis,
        #define as active
        'active': 1,
        #timestamp
        'time_scraped': datetime.datetime.now()
    }
    
    return rtnDict

#print to test script
if __name__ == "__main__":
    print(mars_attacks())