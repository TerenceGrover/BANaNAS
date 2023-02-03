import requests
from bs4 import BeautifulSoup
import re
import time
from selenium import webdriver

url = 'https://data.worldbank.org/indicator/SP.DYN.CBRT.IN'
res = requests.get(url)
soup = BeautifulSoup(res.text, 'html.parser')

# data = {}
current_category = None
# with open("data.js", "a") as file:
#   file.write( "const allQueries = { \n")
with open("data.js", "a") as file:
    file.write(" const countryCodes = {\n")
    driver = webdriver.Firefox()
    driver.get(url)
    html = driver.page_source
    inner_soup = BeautifulSoup(html, "html.parser")
    infiniteDiv = inner_soup.find_all("div", {"class": "infinite"})
    items = infiniteDiv[0].find_all("div", {"class": "item"})[1:]
    countries_available = []
    for div in items:
        target_div = div.find_all("div")[0]
        country = target_div['data-text']
        countryCode = target_div.a['href'].split("/")[-1]
        match = re.search(r'locations=(\w+)', countryCode)
        with open("data.js", "a") as file:
            file.write('"' + str(country) + '" : "' + str(match.group(1)) + "\",\n")
    driver.quit()
