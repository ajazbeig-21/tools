first create app.py with simpel fastapi endoind

python3 -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn
uvicorn app:app --reload --port 8000

after hitting
http://localhost:8000/users

we are able to get the content
[{"id":1,"name":"Ajaz"},{"id":2,"name":"John"}]