from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def home():
    return {"message": "FastAPI Running"}


@app.get("/health")
def health():
    return {"status": "UP"}