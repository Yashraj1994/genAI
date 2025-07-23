import React, { useState } from "react";
import axios from "axios";

const Generate = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const generateAnswer = async (e) => {
    e.preventDefault();
    setGeneratingAnswer(true);
    setAnswer("Loading your answer. It may take up to 10 seconds...");

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": "AIzaSyDH9KMA46-i1Hxgz1Dmc0kAT41yorKcKvk",
          },
        }
      );

      if (response.data?.candidates?.length > 0) {
        setAnswer(
          response.data.candidates[0]?.content?.parts[0]?.text ||
            "No answer generated."
        );
      } else {
        setAnswer("No answer generated.");
      }
    } catch (error) {
      console.error(
        "Error generating answer:",
        error.response?.data || error.message
      );
      setAnswer(
        "An error occurred while generating the answer. Please try again."
      );
    } finally {
      setGeneratingAnswer(false);
    }
  };

  return (
    <div className="generate-container">
      <h1 className="title">🤖 Ask the AI Assistant</h1>
      <form onSubmit={generateAnswer}>
        <textarea
          className="input-textarea"
          rows={6}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className={`submit-btn ${generatingAnswer ? "disabled" : ""}`}
          disabled={generatingAnswer}
        >
          {generatingAnswer ? "Generating..." : "Get Response"}
        </button>
      </form>

      <div className="response-box">
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default Generate;
