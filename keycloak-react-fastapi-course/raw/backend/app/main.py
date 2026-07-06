from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EmployeeCreate(BaseModel):
    name: str
    role: str
    status: str


EMPLOYEES = [
    {"id": 1, "name": "Ajaz", "role": "Admin", "status": "Active"},
    {"id": 2, "name": "Rahul", "role": "Employee", "status": "Working"},
    {"id": 3, "name": "John", "role": "Employee", "status": "Offline"},
]

REPORTS = [
    {
        "id": 1,
        "title": "Monthly Access Report",
        "type": "Security",
        "status": "Ready",
    },
    {
        "id": 2,
        "title": "Employee Activity Summary",
        "type": "HR",
        "status": "Ready",
    },
    {
        "id": 3,
        "title": "Role Audit",
        "type": "Compliance",
        "status": "In Review",
    },
]

PROFILE = {
    "id": 1,
    "name": "Ajaz",
    "email": "ajaz@gmail.com",
    "role": "Admin",
    "department": "Engineering",
    "status": "Active",
}


@app.get("/")
def home():
    return {"message": "FastAPI Running"}


@app.get("/health")
def health():
    return {"status": "UP"}


@app.get("/employees")
def get_employees():
    return EMPLOYEES


@app.post("/employees", status_code=201)
def create_employee(employee: EmployeeCreate):
    return {
        "id": 4,
        "name": employee.name,
        "role": employee.role,
        "status": employee.status,
    }


@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: int):
    return {"message": f"Employee {employee_id} deleted"}


@app.get("/reports")
def get_reports():
    return REPORTS


@app.get("/profile")
def get_profile():
    return PROFILE
