import os
import openai
from dotenv import load_dotenv


# TODO: Refactor to use Open Router
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
        model="meta-llama/Llama-2-70b-chat-hf",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=700,
        temperature=0.20,
    )

    # Extract the summary
    summary: str = response["choices"][0]["message"]["content"].strip()
    return summary
