


import json
import time
import pandas as pd
from .vapi_api import VAPI
from dotenv import load_dotenv
import os
from threading import Thread,Lock
from dateutil.parser import parse
from src.supabasedb import supabase 
from langchain_community.chat_models import ChatOpenAI


load_dotenv()


openai_api_key = os.getenv("OPENAI_API_KEY")
auth_token = os.getenv("VAPI_AUTHTOKEN")

first_message = "Hello, this is Mary from Mary's Dental. How can I assist you today?"
content ="""You are a voice assistant for Mary's Dental, a dental office located at 123 North Face Place, 
Anaheim, California. The hours are 8 AM to 5PM daily, but they are closed on Sundays.  Mary's dental provides 
dental services to the local Anaheim community. The practicing dentist is Dr. Mary Smith.  You are tasked with 
answering questions about the business, and booking appointments. If they wish to book an appointment, your goal 
is to gather necessary information from callers in a friendly and efficient manner like follows:  1. Ask for their 
full name. 2. Ask for the purpose of their appointment. 3. Request their preferred date and time for the appointment. 
4. Confirm all details with the caller, including the date and time of the appointment.  - Be sure to be kind of funny 
and witty! - Keep all your responses short and simple. Use casual language, phrases like 
Umm..., Well..., and I mean are preferred. - This is a voice conversation, so keep your responses short, 
like in a real conversation. Don't ramble for too long."""


def run_compaign(file_path, auth_token):
    if file_path.split(".")[-1] == "csv":
        data = pd.read_csv(file_path)
    else:
        data = pd.read_excel(file_path)
    vapi = VAPI(auth_token)
    list_phone_number  = vapi.get_phone_numbers()
    total_phone_numbers = len(list_phone_number)
    free_phone_numbers : list = list_phone_number
    with open("free_phone_numbers.json", "w") as f:
        for item in free_phone_numbers:
            f.write("%s\n" % item)
    count=0
    status_lock = Lock()

    for index, row in data.iterrows():   
        print(row['first_name'], row['last_name'], row['other_phone'])
        print("free phone numbers: ",len(free_phone_numbers))
        
        if count == total_phone_numbers:
            count = 0

        while len(free_phone_numbers) == 0:
            time.sleep(5)
            with open("free_phone_numbers.json", "r") as f:
                free_phone_numbers = f.read().splitlines()
            for i in range(len(free_phone_numbers)):
                free_phone_numbers[i] = json.loads(free_phone_numbers[i].replace("'", "\""))
        print("free phone numbers after while: ",len(free_phone_numbers))

        customer_name = row['first_name'] + " " + row['last_name']
        customer_number = str(row['other_phone'])
        print('free_phone_numbers: ',free_phone_numbers)
        if "assistantId" in free_phone_numbers[0].keys():
            assistant_id = free_phone_numbers[0]['assistantId']
        else:
            assistant_id = None
        phone_number_id = free_phone_numbers[0]['id']
        if customer_number[0] != "+":
            customer_number = "+" + customer_number
        print("Customer Name: ",customer_name)
        print("Customer Number: ",customer_number)
        print("Assistant ID: ",assistant_id)
        print("Phone Number ID: ",phone_number_id)
        if assistant_id == None:
            result = vapi.get_assistants()
            assistant_id = result[0]['id']
            

        call_data = vapi.make_call(phone_number_id, customer_number, customer_name, assistant_id, first_message, content)
        
        call_id = call_data['id']
        print("Call ID: ",call_id)
        print("Phone Number ID: ",phone_number_id)
        print("Customer Name: ",customer_name)
        print("Customer Number: ",customer_number)
        print("Assistant ID: ",assistant_id)
        status_lock.acquire()
        with open("free_phone_numbers.json", "r") as f:
            free_phone_numbers = f.read().splitlines()
        for i in range(len(free_phone_numbers)):
            free_phone_numbers[i] = json.loads(free_phone_numbers[i].replace("'", "\""))
        free_phone_numbers.pop(0)
        with open("free_phone_numbers.json", "w") as f:
            for item in free_phone_numbers:
                f.write("%s\n" % item)
        status_lock.release()
        print("free phone numbers after pop: ",len(free_phone_numbers))
        status_thread = Thread(target=check_status_of_calls, args=(vapi, call_id, list_phone_number[count],status_lock))
        status_thread.daemon = True
        status_thread.start()
        count += 1




def check_status_of_calls(vapi : VAPI, call_id,phone_number,lock:Lock):
    status = "queued"
    while status != "ended":
        call_data = vapi.get_phone_call(call_id)
        
        status = call_data['status']
        time.sleep(5)
    data = {
        "created_at": call_data['startedAt'],
        "metadata": "",
        "log_dump": ""
    }
    if "summary" in call_data.keys():
        data["summary"] = call_data['summary']
    if "transcript" in call_data.keys():
        data["transcript"] = call_data['transcript']
    if "cost" in call_data.keys():
        data["total_cost"] = call_data['cost']
    if "endedReason" in call_data.keys():
        data["end_reason"] = call_data['endedReason']
    if "customer" in call_data.keys():
        data["phone"] = call_data['customer']['number']
    if "endedAt" in call_data.keys():
        data["call_date"] = call_data['endedAt'].split("T")[0]
        ended_at = parse(call_data['endedAt'])
        started_at = parse(call_data['startedAt'])
        data["duration"] = int((ended_at - started_at).total_seconds())
        print("data: ",data)
    result = supabase.table("call_logs").insert([data]).execute()
    print("result: ",result)

    model = ChatOpenAI(api_key=openai_api_key,
                    temperature=0.6,
                    model="gpt-4o")
    prompt=f"""You are a helpful assistant. Your job is read summary and write answer according to instructions.

### Summary:
{data["summary"]}   

### Instructions:
1. Call_back: if someone does not pick up the phone or if they do pick up but hard to understand or needs a follow up with no appt.
2. Wrong_Number: the number given does not correlate to the persons name. Need to make sure this is out of the dialing system
3. Do_not_call: if someone says the words "do not call" "stop calling Me" etc. we need to filter that out
4. Successful_sale: basically we have appt set this client and is sent our calendar so a human can call them back

Make Sure Your answer only contains one of these options: Call_back, Wrong_Number, Do_not_call, Successful_sale.
No need to write anything else.

### Answer:

"""
    print("prompt: ",prompt)
    answer = model.invoke(prompt)
    print("answer: ",answer)

    supabase.table("call_logs_status").insert([{"call_logs_id":result.data[0]['id'],"status":answer.content}]).execute()
    
        
    lock.acquire()
    #append phone number to free phone numbers
    with open("free_phone_numbers.json", "r") as f:
        free_phone_numbers = f.read().splitlines()
    for i in range(len(free_phone_numbers)):
        free_phone_numbers[i] = json.loads(free_phone_numbers[i].replace("'", "\""))
    free_phone_numbers.append(phone_number)
    with open("free_phone_numbers.json", "w") as f:
        for item in free_phone_numbers:
            f.write("%s\n" % item)
    lock.release()

      



def run_call_script(file_path): 
    run_compaign(file_path, auth_token)



