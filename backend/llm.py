import os
from openai import OpenAI
from dotenv import load_dotenv
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Add a handler if logs aren't appearing
handler = logging.StreamHandler()
handler.setFormatter(
    logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
)
logger.addHandler(handler)

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=dotenv_path)

# gets API Key from environment variable OPENAI_API_KEY
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)


def generate_summary(content: str) -> str:
    """Summarize the provided content using OpenRouter and Llama models."""

    # Updated messages array with system and user prompts
    messages = [
        {
            "role": "system",
            "content": """You are a precise summarizer that:
            1. Extracts key points in bullet form
            2. Maintains original meaning and context
            3. Removes redundant information
4. Structures output with clear sections
5. Preserves technical accuracy""",
        },
        {
            "role": "user",
            "content": f"Summarize this content with key points and main takeaways:\n\n{content}",
        },
    ]

    response = client.chat.completions.create(
        model="meta-llama/llama-3.2-3b-instruct:free",
        messages=messages,
        max_tokens=750,
        temperature=0.25,
    )

    # Extract and verify the summary
    try:
        summary = response.choices[0].message.content.strip()
        if not summary:
            raise ValueError("Empty summary received")
        logger.info(f"Generated summary: {summary}")
        return summary
    except (AttributeError, IndexError) as e:
        logger.error("Error parsing API response: %s", response)
        raise ValueError(f"Failed to extract summary from response: {e}")
