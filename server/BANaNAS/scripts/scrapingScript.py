import requests
from bs4 import BeautifulSoup
import re
import time
from selenium import webdriver
import string


def remove_special_characters(input_string):
    # Make a translation table to remove all special characters
    translate_table = input_string.maketrans("", "", string.punctuation)

    # Use this table to remove all special characters from the input string
    return input_string.translate(translate_table)


url = 'https://data.worldbank.org/indicator?tab=featured'
res = requests.get(url)
soup = BeautifulSoup(res.text, 'html.parser')

# data = {}
current_category = None
# with open("data.js", "a") as file:
#   file.write( "const allQueries = { \n")
for section in soup.find_all("section"):
    # if section.h3.text == "Agriculture & Rural Development" or 
    #    section.h3.text == "Aid Effectiveness" or 
    #    section.h3.text == "Climate Change" or 
    #    section.h3.text == "Economy & Growth":
    #     continue
    print(section.h3.text)
    cat = remove_special_characters(section.h3.text)
    with open("data.js", "a") as file:
        file.write(str(cat.replace(" ", "")) + ": {\n")
    # find all the "li" elements inside the current "section" element
    for li in section.find_all("li"):
        # find the first "a" element inside the current "li" element
        a = li.find("a")
        # if the "a" element was found, extract its text
        if a:
            new_url = "https://data.worldbank.org" + a['href']
            driver = webdriver.Firefox()
            success = False
            tries = 0
            while not success:
                try:
                    if tries > 5:
                        break
                    tries += 1
                    driver.get(new_url)
                    success = True
                except:
                    time.sleep(5)
            if not success:
                print("Failed to load page")
                continue
            html = driver.page_source
            inner_soup = BeautifulSoup(html, "html.parser")
            infiniteDiv = inner_soup.find_all("div", {"class": "infinite"})
            items = infiniteDiv[0].find_all("div", {"class": "item"})[1:]
            countries_available = []
            for div in items:
                target_div = div.find_all("div")[1]
                if target_div.text:
                    countries_available.append(div.a.text)
                else:
                    continue
                driver.quit()  # close the browser instance after each iteration
            # here i collected the data bout countries for one metric. push it to the right category
            # take the a.text and slice it to the first comma
            indicatorString = re.search(
                r"/indicator/(.*)\?", a['href']).group(1)
            try:
                comma_index = a.text.index(",")
            except ValueError:
                try:
                    comma_index = a.text.index("(")
                except ValueError:
                    comma_index = len(a.text)
            result = a.text[:comma_index].title().replace(" ", "")
            abc = {
                'description': a.text,
                'queryString': 'http://api.worldbank.org/v2/country/countryCode/indicator/' + indicatorString + '?date=startYear:endYear&format=json',
                'parameters_needed': ['countryCode', 'startYear', 'endYear'],
                'indicator': indicatorString,
                'countries_available': countries_available,
                'provider': 'World Bank',
            }
            with open("data.js", "a") as file:
                file.write(str(result) + ':' + str(abc) + ",\n")
    with open("data.js", "a") as file:
        file.write("\n},\n")
