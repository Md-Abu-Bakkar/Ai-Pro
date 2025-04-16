import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    setResponse(data.text);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-6">Personal AI Code Assistant</h1>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows="6"
          className="w-full p-4 border border-gray-300 rounded-md mb-4"
          placeholder="Type your HTML/CSS/JS code here..."
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 bg-blue-500 text-white rounded-md mb-4"
        >
          {loading ? "Loading..." : "Ask AI"}
        </button>
        <div className="border-t border-gray-300 pt-4">
          <h3 className="font-semibold mb-2">AI Response</h3>
          <pre className="bg-gray-100 p-4 rounded-md">{response}</pre>
        </div>
      </div>
    </div>
  );
}
