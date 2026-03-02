my_dict = {
  "type": "mcq",
  "question": "What is the primary method of studying nature in science?",
  "options": [
    "Observation only",
    "Experimentation and reasoning",
    "Classical physics theories",
    "Quantum mechanics principles"
  ],
  "correct_answer": "B. Experimentation and reasoning"
}

mcq = []

for q in my_dict:
    if(isinstance(q, dict)):
        if "question" in my_dict and "options" in my_dict and "correct_answer" in my_dict:
            q.get("correct_answers") in q.get["options"]:
             mcq.append(q)

else: 
    print(f"Warning: Invalid question format: {q}")