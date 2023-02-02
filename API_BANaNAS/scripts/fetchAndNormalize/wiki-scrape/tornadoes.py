import requests
from bs4 import BeautifulSoup
import json
import re

dict = {}

url = 'https://en.wikipedia.org/wiki/List_of_tornadoes_causing_100_or_more_deaths'

res = requests.get(url)

soup = BeautifulSoup(res.text, 'html.parser')

parent_element = soup.find("table", class_="wikitable")

tableBody = parent_element.find_next('tbody')

for row in tableBody:
  country = row.find_next('td').find_next('td').text.strip()
  year = row.find_next('td').find_next('td').find_next('td').text.strip()
  deathtoll = row.find_next('td').find_next('td').find_next('td').find_next('td').text.strip()
  dict[year] = {'country': country, 'deathtoll': deathtoll}

print(dict)

with open("tornadoes.json", "w") as f:
    json.dump(dict, f)
