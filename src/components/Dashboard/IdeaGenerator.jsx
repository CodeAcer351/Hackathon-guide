import { useState } from "react"
import { OpenAI } from "openai"
import { toast } from "react-hot-toast"

export default function IdeaGenerator() {
  const [skillLevel, setSkillLevel] = useState("beginner")
  const [interests, setInterests] = useState("")
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(false)

  const generateIdeas = async () => {
    if (!interests.trim()) {
      toast.error("Please enter your interests")
      return
    }

    setLoading(true)
    try {
      // In a real app, you would call your backend API that uses OpenAI
      // For MVP, we'll simulate the response
      
      // Mock response based on user input
      setTimeout(() => {
        const mockIdeas = [
          `Build a ${interests} app that helps ${skillLevel} users track their progress`,
          `Create a ${interests} platform with gamification elements for ${skillLevel}s`,
          `Develop a ${interests} tool that simplifies complex concepts for ${skillLevel}s`,
        ]
        setIdeas(mockIdeas)
        setLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error generating ideas:", error)
      toast.error("Failed to generate ideas")
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Project Idea Generator</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Skill Level
          </label>
          <select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Interests (e.g., health, education, gaming)
          </label>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="What are you interested in building?"
          />
        </div>
        <button
          onClick={generateIdeas}
          disabled={loading}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Ideas"}
        </button>
      </div>

      {ideas.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Generated Ideas</h2>
          <div className="space-y-4">
            {ideas.map((idea, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md border-l-4 border-indigo-500"
              >
                <p>{idea}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}