# Sentinel ML - Beginner's Guide to Machine Learning

If you are presenting this project and someone asks, "How does the ML work?", this guide will help you answer confidently!

## 1. What is an LLM vs a Custom Model?

**LLM (Large Language Model - e.g., Gemini, ChatGPT):**
* These are massive models trained on the entire internet. They are very smart but very slow and expensive.
* **Prompt Engineering:** Right now, your app uses "Prompt Engineering." This means instead of training a model, we are just asking a really smart model (Gemini) to "Pretend you are a security expert and read this code."

**Custom ML Model (e.g., CodeBERT):**
* This is a smaller, specialized model. Instead of knowing everything, it only knows one thing: **Code**.
* In a professional setup, you don't use Gemini for every single file (it costs too much). You use a custom model to quickly scan thousands of files, and only send the "broken" ones to Gemini to write the fix. This is called a **Hybrid Architecture**.

## 2. What is "Training" vs "Fine-Tuning"?

**Pre-Training:**
Imagine teaching a baby the English language from scratch. That takes years and millions of dollars. Microsoft did this with **CodeBERT**. They fed it billions of lines of GitHub code so it understands what a `for` loop is, what a `class` is, and how Python differs from JavaScript.

**Fine-Tuning (What you will do):**
Now imagine taking an adult who already speaks English and sending them to a 2-week course to become a Security Guard. They don't need to relearn English; they just need to learn how to spot a thief.
* **Fine-tuning** is taking the already-smart **CodeBERT** model and feeding it a specific dataset (e.g., 10,000 examples of SQL injection vulnerabilities). 
* You "tweak" its brain so it becomes an expert at spotting vulnerabilities.

## 3. The ML Workflow (How to actually do it)

If you decide to build the Python ML Backend, here is the exact process you would follow in a Jupyter Notebook:

1. **The Dataset:** You download an open-source dataset called **Devign** or **CodeXGLUE**. It's basically an Excel file where Column A is "Source Code" and Column B is "Is Vulnerable? (0 or 1)".
2. **Tokenization:** Neural networks don't read words; they read numbers. You use a tool to convert the code `console.log("hello")` into a list of numbers `[45, 12, 99]`.
3. **Training Loop:** You feed the numbers into CodeBERT. It guesses if the code is vulnerable. It checks the answer key (0 or 1). If it guessed wrong, it adjusts its math slightly so it guesses better next time. It does this thousands of times.
4. **Inference:** Once trained, you save the model. When your React app sends new code to your Python server, your model predicts the vulnerability in milliseconds.

## 4. How to Defend Your Project Right Now

If someone asks about the ML in your project *today*, you can say:

> *"Currently, Sentinel uses a Generative AI approach via Prompt Engineering with the Gemini LLM. However, the architecture is designed to be a **Hybrid System**. Our next phase is to deploy a Python FastAPI backend hosting a fine-tuned **CodeBERT** model for high-speed, localized vulnerability classification (the First Pass), and reserve the Gemini LLM exclusively for generating the remediation patches (the Second Pass). "*

This makes you sound incredibly knowledgeable about ML system design!
