import json
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

options = webdriver.ChromeOptions()
options.add_argument("--headless")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

driver.get("https://www.myscheme.gov.in/search")
time.sleep(5)

schemes = []

# Scroll to load more schemes
for _ in range(30):  # increase for more data
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)

cards = driver.find_elements(By.CLASS_NAME, "scheme-card")

for card in cards:
    try:
        name = card.find_element(By.TAG_NAME, "h2").text
        description = card.find_element(By.TAG_NAME, "p").text
        link = card.find_element(By.TAG_NAME, "a").get_attribute("href")

        schemes.append({
            "name": name,
            "description": description,
            "link": link,
            "source": "myscheme"
        })
    except:
        continue

driver.quit()

print(f"Collected {len(schemes)} schemes")

with open("../backend/schemes.json", "w", encoding="utf-8") as f:
    json.dump(schemes, f, indent=2, ensure_ascii=False)
