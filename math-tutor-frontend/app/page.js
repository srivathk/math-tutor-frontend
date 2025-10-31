"use client";
import { useState } from "react";

export default function Home() {
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
      setResponse({
        hint: "Error connecting to backend.",
        proposed_step: "",
        verified: false,
      });
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Math Tutor</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg"
      >
        <label className="block text-gray-300 mb-2">
          Enter a math problem:
        </label>
        <input
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="e.g. Solve for x: 3(x - 2) = 12"
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 mb-4 text-white"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 font-semibold py-3 rounded-lg transition"
        >
          {loading ? "Thinking..." : "Get Hint"}
        </button>
      </form>

      {response && (
        <div className="mt-6 bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-400">
            Tutor Response
          </h2>
          <p>
            <strong>Hint:</strong> {response.hint}
          </p>
          <p>
            <strong>Proposed Step:</strong> {response.proposed_step}
          </p>
          <p>
            <strong>Verified:</strong>{" "}
            {response.verified ? (
              <span className="text-green-400">✅ Correct</span>
            ) : (
              <span className="text-red-400">❌ Not Verified</span>
            )}
          </p>
        </div>
      )}
    </main>
  );
}
