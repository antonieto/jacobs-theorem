from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/items")
def create_item(item: Item):
    return {"item_name": item.name, "item_description": item.description}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
