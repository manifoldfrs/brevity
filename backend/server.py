from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.llm import generate_summary
import logging
import uvicorn

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Origin"],
)


class Content(BaseModel):
    content: str


@app.post("/summarize")
async def summarize(content: Content):
    """Endpoint to summarize content."""
    logger.info(f"Received content: {content.content[:100]}...")  # Log first 100 chars
    try:
        summary = generate_summary(content.content)
        logger.info(f"Generated summary: {summary}")
        return {"summary": summary}
    except Exception as e:
        logger.error(f"Error generating summary: {e}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(
        "backend.server:app",
        host="0.0.0.0",
        port=8000,
        log_level="info",
    )
