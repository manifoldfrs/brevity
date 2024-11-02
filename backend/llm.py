import os
import openai
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=dotenv_path)


def generate_summary(content: str) -> str:
    """Summarize the provided content using OpenRouter and Llama models."""
    # Load environment variables
    load_dotenv()
    openai.api_key = os.getenv("OPENROUTER_API_KEY")
    openai.api_base = "https://openrouter.ai/api/v1"

    # Prepare the prompt
    prompt: str = f"Summarize the following content:\n\n{content}"

    # Call OpenRouter API
    response = openai.ChatCompletion.create(
        model="meta-llama/llama-3.2-3b-instruct:free",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=750,
        temperature=0.25,
    )

    # Extract the summary
    summary: str = response["choices"][0]["message"]["content"].strip()
    return summary
