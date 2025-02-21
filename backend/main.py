from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from scraper import Scraper
from scraper import User

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

grades = Scraper()

@app.post("/grades")
async def get_grades(user: User):
        return grades.scrape(user)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)