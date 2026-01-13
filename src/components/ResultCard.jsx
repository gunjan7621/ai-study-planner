export default function ResultCard({ result }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mt-8 whitespace-pre-line">
      <h2 className="text-2xl font-semibold text-primary mb-4">
        Your AI Study Plan
      </h2>
      <p className="text-gray-700">{result}</p>
    </div>
  )
}
