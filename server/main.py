from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from typing import Dict
import openai
from dotenv import load_dotenv
import json
from fastapi.middleware.cors import CORSMiddleware
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

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
    averageMonthlyBalance: float

# Define the input model
class ConversationInput(BaseModel):
    conversation: str

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10),
    retry=retry_if_exception_type((json.JSONDecodeError, ValueError))
)
async def call_chatgpt(prompt: str) -> str:
    try:
        client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that extracts financial information from conversations."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000

        )
        response = response.choices[0].message.content
        extracted_data = json.loads(response)
        return extracted_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")

@app.post("/extract-data", response_model=ExtractedData)
async def extract_financial_data(input: ConversationInput):
    try:
        extraction_prompt = """
            Extract the following information from this conversation and format it as a JSON object:
            {
              "occupation": "User's job or profession",
              "incomeSource": "Source of the user's income",
              "moneyUsage": "How the user plans to use their money",
              "averageMonthlyBalance": "Average monthly account balance (number)",
            }

            Return only the raw JSON object, without any additional text.
        """
        extracted_data = await call_chatgpt(f"{extraction_prompt}\n\nConversation: {input.conversation}")
        return ExtractedData(**extracted_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid data format from ChatGPT: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

class RecommendationInput(BaseModel):
    user_data: str

# Define the recommendation response model
class ProductRecommendation(BaseModel):
    name: str
    type: str
    reason: str
    key_benefits: list[str]
    requirements: list[str]

class RecommendationResponse(BaseModel):
    user_summary: str
    recommendations: list[ProductRecommendation]
    additional_advice: str

@app.post("/recommend-products", response_model=RecommendationResponse)
async def recommend_products(input: RecommendationInput):
    try:
        # Load Banorte products data
        with open("banorte_products.json", "r") as f:
            banorte_products = json.load(f)

        # Now, use the extracted data to get product recommendations
        recommendation_prompt = f"""
            Based on the following user profile and the Banorte products data, recommend the most suitable financial products for the user. Provide a brief summary of the user's profile, list up to 3 recommended products with reasons, key benefits, and requirements, and give some additional financial advice.

            User Profile:
            {input.user_data}

            Banorte Products:
            {json.dumps(banorte_products, indent=2)}

            Format your response as a JSON object with the following structure:
            {{
              "user_summary": "Brief summary of the user's financial profile",
              "recommendations": [
                {{
                  "name": "Product name",
                  "type": "Product type",
                  "reason": "Reason for recommendation",
                  "key_benefits": ["Benefit 1", "Benefit 2", ...],
                  "requirements": ["Requirement 1", "Requirement 2", ...]
                }},
                ...
              ],
              "additional_advice": "Additional financial advice for the user"
            }}

            Return only the raw JSON object, without any additional text.
        """

        recommendation_response = await call_chatgpt(recommendation_prompt)
        return RecommendationResponse(**recommendation_response)
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
