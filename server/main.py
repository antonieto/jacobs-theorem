from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from typing import Dict
import openai
from dotenv import load_dotenv
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

# Define the schema for the extracted data
class ExtractedData(BaseModel):
    occupation: str
    incomeSource: str
    moneyUsage: str
    primaryFinancialActivities: str
    fundingSource: str
    averageMonthlyBalance: float
    withdrawals: Dict[str, float]
    deposits: Dict[str, float]

# Define the input model
class ConversationInput(BaseModel):
    conversation: str

async def call_chatgpt(conversation: str) -> str:
    try:
        client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        print(f"conversation: {conversation}")

        extraction_prompt = """
            Extract the following information from this conversation and format it as a JSON object:
            {
              "occupation": "User's job or profession",
              "incomeSource": "Source of the user's income",
              "moneyUsage": "How the user plans to use their money",
              "primaryFinancialActivities": "Main financial activities or transactions",
              "fundingSource": "Where the user's funds come from",
              "averageMonthlyBalance": "Average monthly account balance (number)",
              "withdrawals": {
                "count": "Number of withdrawals per month (integer)",
                "amount": "Total amount of withdrawals (number)"
              },
              "deposits": {
                "count": "Number of deposits per month (integer)",
                "amount": "Total amount of deposits (number)"
              }
            }

            Return only the raw JSON object, without any additional text.
        """

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that extracts financial information from conversations."},
                {"role": "user", "content": f"{extraction_prompt}\n\nConversation: {conversation}"}
            ],
            max_tokens=500

        )
        return response.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")

@app.post("/extract-data", response_model=ExtractedData)
async def extract_financial_data(input: ConversationInput):
    try:
        chatgpt_response = await call_chatgpt(input.conversation)
        extracted_data = json.loads(chatgpt_response)
        return ExtractedData(**extracted_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid data format from ChatGPT: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


@app.get("/")
async def root():
    return {"message": "Hello World"}
