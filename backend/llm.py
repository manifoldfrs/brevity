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

    # Updated messages array with system and user prompts
    messages = [
        {
            "role": "system",
            "content": "You are a precise summarizer. Create clear, concise summaries that capture the main points while maintaining accuracy. Focus on key information and maintain the original meaning.",
        },
        {
            "role": "user",
            "content": f"Please provide a concise summary of the following content:\n\n{content}",
        },
    ]

    # Call OpenRouter API with updated messages
    response = openai.ChatCompletion.create(
        model="meta-llama/llama-3.2-3b-instruct:free",
        messages=messages,
        max_tokens=750,
        temperature=0.25,
    )

    # Extract the summary
    summary: str = response["choices"][0]["message"]["content"].strip()
    return summary
