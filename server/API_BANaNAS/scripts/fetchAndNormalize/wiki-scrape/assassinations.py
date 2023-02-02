import requests
from bs4 import BeautifulSoup
import json

url = "https://en.wikipedia.org/wiki/List_of_assassinations"

res = requests.get(url)

soup = BeautifulSoup(res.text, "html.parser")

parent_element = soup.find("div", class_="mw-parser-output")
countries = parent_element.find_all("h3")


dict = {}
for country in countries:
    country_name = country.span.text
    years = set()

    table = country.find_next("table")
    tableBody = table.find_next('tbody')
    for row in tableBody:
        year = row.find_next('td').text.strip()
        victim = row.find_next('td').find_next('td').text.strip()
        years.add((victim, year))

    dict[country_name] = list(years)

print(dict)

with open("assassinations.json", "w") as f:
    json.dump(dict, f)
