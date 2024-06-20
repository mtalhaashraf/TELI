from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from vapi.vapi import router
from src.utils import templates

app = FastAPI()
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/", response_class=HTMLResponse)
def main(request: Request):
    # Render upload form using Jinja template
    return templates.TemplateResponse("upload_form.html", {"request": request})


