from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def home():
    return {"message": "User Service"}


@app.get("/users")
def users():
    return [
        {"id": 1, "name": "Ajaz"},
        {"id": 2, "name": "John"}
    ]