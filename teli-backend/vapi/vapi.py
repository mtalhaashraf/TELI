from fastapi.routing import APIRouter
from fastapi import File, Form, Request, UploadFile
from .crud import *
from threading import Thread
from src.utils import templates
from fastapi.responses import Response
from fastapi import status



router = APIRouter(
    prefix="/vapi",
    tags=["vapi"]
)

@router.post("/uploadfile/")
async def handle_upload(ClientID:str=Form(),CampaignID:str=Form(), file: UploadFile = File(...)):
    if file.filename.split(".")[-1] not in ['csv', 'xlsx']:
        return Response(status_code=status.HTTP_400_BAD_REQUEST, content="Only CSV and Excel files are allowed")
    file_location = f"{file.filename}"
    parrent_dir = "static/"
    if not os.path.exists(parrent_dir):
        os.makedirs(parrent_dir)
    if not os.path.exists(f"{parrent_dir}{ClientID}"):
        os.makedirs(f"{parrent_dir}{ClientID}")
    if not os.path.exists(f"{parrent_dir}{ClientID}/{CampaignID}"):
        os.makedirs(f"{parrent_dir}{ClientID}/{CampaignID}")
    file_location = f"{parrent_dir}{ClientID}/{CampaignID}/{file_location}"
    with open(file_location, "wb+") as file_object:
        file_object.write(await file.read())
    
    call_thread = Thread(target=run_call_script, args=(file_location,))
    call_thread.daemon = True
    call_thread.start()
    return Response(status_code=status.HTTP_200_OK, content="File uploaded successfully")

