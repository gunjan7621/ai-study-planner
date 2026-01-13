import InputForm from "../components/InputForm"
import ResultCard from "../components/ResultCard"
import { useState } from "react"

export default function Home() {
  const [result, setResult] = useState("")

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-primary">
        AI Study Planner
      </h1>
      <p className="text-center text-gray-600 mt-3">
        Turn your syllabus into a daily action plan 🚀
      </p>

      <InputForm setResult={setResult} />

      {result && <ResultCard result={result} />}
    </div>
  )
}
