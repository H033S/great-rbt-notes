from fastapi import FastAPI

from main.chat import ChatGPTHandler
from main.models import SessionData

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/report/")
def generate_report(session_data: SessionData):
    gpt_handler = ChatGPTHandler()

    response = gpt_handler.query(session_data)

    return response
