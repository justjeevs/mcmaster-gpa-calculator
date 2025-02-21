from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from pydantic import BaseModel

PATH = "chromedriver-win64\chromedriver.exe"
service = Service(executable_path=PATH)

class User(BaseModel):
    username: str
    password: str

class Scraper():

    def scrape(self, user: User):
        chrome_options = Options()
        # to keep browser from quitting after execution
        # chrome_options.add_experimental_option("detach", True)
        chrome_options.add_argument("--headless=new")

        driver = webdriver.Chrome(service = service, options=chrome_options)

        driver.get("https://csprd.mcmaster.ca/psp/prcsprd/?cmd=login&languageCd=ENG&")
        driver.maximize_window()

        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, "userid")))
        username = driver.find_element(By.ID, "userid")
        username.clear()
        username.send_keys(user.username)

        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, "pwd")))
        password = driver.find_element(By.ID, "pwd")
        password.clear()
        password.send_keys(user.password + Keys.ENTER)

        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, "//*[starts-with(@id, 'MCM_IMG_CLASS')]")))
        student_center = driver.find_element(By.XPATH, "//*[starts-with(@id, 'MCM_IMG_CLASS')]").click()

        iframe = driver.find_element(By.ID, "ptifrmtgtframe")
        driver.switch_to.frame(iframe)

        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, "DERIVED_SSS_SCR_SSS_LINK_ANCHOR4")))
        my_academics = driver.find_element(By.ID, "DERIVED_SSS_SCR_SSS_LINK_ANCHOR4").click()

        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, "DERIVED_SSSACA2_SSS_ACAD_HISTORY")))
        course_history = driver.find_element(By.ID, "DERIVED_SSSACA2_SSS_ACAD_HISTORY").click()

        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, "CRSE_HIST$srt14$0")))

        course_history_list = []
        table = driver.find_element(By.XPATH, "//*[@id='CRSE_HIST$scroll$0']/tbody/tr/td/table")
        for row in table.find_elements(By.TAG_NAME, "tr"):
            course_dictionary = dict.fromkeys(["course", "description", "term", "grade", "units", "status", "repeatCode"])
            for index, cell in enumerate(row.find_elements(By.TAG_NAME, "td")):
                if index == 0:
                    course_dictionary["course"] = cell.text
                elif index == 1:
                    course_dictionary["description"] = cell.text
                elif index == 2:
                    course_dictionary["term"] = cell.text
                elif index == 3:
                    course_dictionary["grade"] = cell.text
                elif index == 4:
                    course_dictionary["units"] = cell.text
                elif index == 5:
                    course_dictionary["status"] = cell.text
                elif index == 6:
                    course_dictionary["repeatCode"] = cell.text
            course_history_list.append(course_dictionary)
        driver.quit()
        return course_history_list
