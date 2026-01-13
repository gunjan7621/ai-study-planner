import { useState } from "react"
import Loader from "./Loader"

export default function InputForm({ setResult }) {
  const [subjects, setSubjects] = useState("")
  const [hours, setHours] = useState("")
  const [days, setDays] = useState("")
  const [loading, setLoading] = useState(false)

  const generatePlan = async () => {
    // 1. Basic Validation
    if (!subjects || !hours || !days) {
      alert("Please fill in all fields before generating.")
      return
    }

    setLoading(true)
    setResult("") // Clear previous results

    const prompt = `
      Create a detailed day-wise study plan.
      Subjects: ${subjects}
      Study hours per day: ${hours}
      Total days: ${days}
    `

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      })

      const data = await res.json()

      // 2. Check if the server returned an error (like 429 Quota or 500 Server Error)
      if (!res.ok) {
        setResult(`Error: ${data.error || "The AI is currently unavailable. Please check your API quota."}`)
        setLoading(false)
        return
      }

      // 3. Check if we got the expected "choices" format back
      if (data.choices && data.choices[0].message) {
        setResult(data.choices[0].message.content)
      } else {
        setResult("AI returned an empty response. Try refreshing the page.")
      }

    } catch (err) {
      // 4. Handle Network/Connection errors
      setResult("Connection error. Could not reach the server.")
      console.error("Fetch Error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
      <input
        className="w-full p-3 border rounded-lg mb-3"
        placeholder="Subjects (Math, Physics...)"
        value={subjects}
        onChange={(e) => setSubjects(e.target.value)}
      />
      <input
        className="w-full p-3 border rounded-lg mb-3"
        type="number"
        placeholder="Hours per day"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />
      <input
        className="w-full p-3 border rounded-lg mb-4"
        type="number"
        placeholder="Total days"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      />

      <button
        onClick={generatePlan}
        disabled={loading}
        className={`w-full bg-primary text-white py-3 rounded-xl transition ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
        }`}
      >
        {loading ? "Generating..." : "Generate Study Plan"}
      </button>

      {loading && <Loader />}
    </div>
  )
}
