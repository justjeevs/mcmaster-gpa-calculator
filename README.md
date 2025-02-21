# McMaster GPA Calculator

## Problem Statement

McMaster University uses the 12 point GPA scale, ranging from grade point values of 0 (an F) to 12 (an A+). This is different from the more commonly used 4 point scale. To convert from the 12 point scale to 4, one cannot simply just compare the 12 point cumulative GPA to the 4 point equivalent. Each course must be calculated individually with its grade and unit to the 4 point scale and then the total calculation can be done. Unfortunately, this can be a tedious process as you take many courses throughout your academic career. I decided to automate this manual process to do the work for me!

## How It Works

This project consists of a full stack application where the frontend web app is written in React which presents a table of the course information and the ability to edit/delete rows. Users can login via their McMaster credentials to automatically populate the table with their grades or manually add courses if they wish to do so as well. Once the table is filled in, the user can hit calculate to get the corresponding GPA calculations. The backend comes into play when the user wishes to login to automatically update the table with their grades. This is done by hitting a `POST` endpoint at `/grades` with the help of FastAPI. It leverages a web scraper which utilizes Python Selenium to scrape all the grades from the course history tab in Mosaic (McMaster student portal). Feel free to watch a quick demo of how it works [here](#demo)

## How to use

Clone the project

```bash
git clone project
```

Install dependencies for backend (make sure ChromeDriver is installed as well!)

```bash
cd backend
pip install requirements.txt
```

Run backend

```bash
python main.py
```

Install dependencies for frontend

```bash
cd frontend/mac-gpa-calc
npm install
```

Run frontend

```bash
npm run dev
```

## Next Steps

Another feature I would like to add in the works is allowing for transcript uploads and scraping the PDF (or even use AI) to get the grades. That way students can have an alternative to providing their McMaster credentials if they don't wish to do so.

## Demo

![demo](demo.gif)
