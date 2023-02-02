import requests
from bs4 import BeautifulSoup
import json

dict = {}

url = 'https://en.wikipedia.org/wiki/List_of_large_Holocene_volcanic_eruptions'

res = requests.get(url)

soup = BeautifulSoup(res.text, 'html.parser')

parent_element = soup.find("table", class_="wikitable")

tableBody = parent_element.find_next('tbody')

for row in tableBody:
  volcano = row.find_next('td').text.strip()
  year = row.find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').text.strip()
  dict[year] = {'volcano': volcano}


print(dict)

with open("volcanoes.json", "w") as f:
    json.dump(dict, f)

