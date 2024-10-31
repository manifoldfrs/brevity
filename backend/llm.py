import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM


def generate_summary(content: str) -> str:
    """Summarize the provided content using Llama 3.1b."""
    # Load the tokenizer and model
    tokenizer = AutoTokenizer.from_pretrained("llama-3b")
    model = AutoModelForSeq2SeqLM.from_pretrained("llama-3b")

    # Tokenize the input content
    inputs = tokenizer.encode(
        content, return_tensors="pt", max_length=1024, truncation=True
    )

    # Generate the summary
    summary_ids = model.generate(
        inputs, max_length=150, min_length=40, length_penalty=2.0, num_beams=4
    )
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    return summary
