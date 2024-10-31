from fastapi import FastAPI
from pydantic import BaseModel
from llm import generate_summary

app = FastAPI()


class Content(BaseModel):
    content: str


@app.post("/summarize")
async def summarize(content: Content):
    """Endpoint to summarize content."""
    summary = generate_summary(content.content)
    return {"summary": summary}
