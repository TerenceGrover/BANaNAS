import requests
from bs4 import BeautifulSoup
import json

dict = {}

url = 'https://en.wikipedia.org/wiki/List_of_deadly_earthquakes_since_1900'

res = requests.get(url)

soup = BeautifulSoup(res.text, 'html.parser')


table = soup.find("table", class_="sortable")

tableBody = table.find_next('tbody')

for row in tableBody:
  year = row.find_next('td').text.strip()
  country = row.find_next('td').find_next('td').text.strip()
  deaths = row.find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').find_next('td').text.strip()
  if deaths != '':
    if '1966-04' in year:
      continue
    else:
      if '2003-09-22 04:45' in deaths:
        continue
      else:
        if int(deaths) > 10000:
          dict[year] = {'country': country, 'deaths': deaths}

print(dict)

with open("earthquakes.json", "w") as f:
    json.dump(dict, f)