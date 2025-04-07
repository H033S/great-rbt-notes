from fastapi import FastAPI

from main.chat import ChatGPTHandler
from main.models import SessionData

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/api/v1/report/")
def generate_report(session_data: SessionData):
    gpt_handler = ChatGPTHandler()

    response = gpt_handler.query(session_data)

    return response

@app.post("/api/test/report/")
def generate_test_report(session_data: SessionData):

    with open("./test_report.txt") as file:
        dummy_report = file.read()

        return dummy_report
