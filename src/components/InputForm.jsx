import { useState } from "react"
import Loader from "./Loader"

export default function InputForm({ setResult }) {
  const [subjects, setSubjects] = useState("")
  const [hours, setHours] = useState("")
  const [days, setDays] = useState("")
  const [loading, setLoading] = useState(false)

  const generatePlan = async () => {
    if (!subjects || !hours || !days) {
      alert("Fill all fields")
      return
    }

    setLoading(true)
    setResult("")

    const prompt = `
Create a day-wise study plan.

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

      if (!data.choices) {
        setResult("AI failed to generate plan.")
        setLoading(false)
        return
      }

      setResult(data.choices[0].message.content)

    } catch (err) {
      setResult("Something went wrong.")
    }

    setLoading(false)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
      <input
        className="w-full p-3 border rounded-lg mb-3"
        placeholder="Subjects (Math, Physics...)"
        onChange={(e) => setSubjects(e.target.value)}
      />
      <input
        className="w-full p-3 border rounded-lg mb-3"
        type="number"
        placeholder="Hours per day"
        onChange={(e) => setHours(e.target.value)}
      />
      <input
        className="w-full p-3 border rounded-lg mb-4"
        type="number"
        placeholder="Total days"
        onChange={(e) => setDays(e.target.value)}
      />

      <button
        onClick={generatePlan}
        className="w-full bg-primary text-white py-3 rounded-xl hover:scale-105 transition"
      >
        Generate Study Plan
      </button>

      {loading && <Loader />}
    </div>
  )
}
