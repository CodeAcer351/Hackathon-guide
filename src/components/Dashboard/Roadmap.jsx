import { useState } from "react"
import { toast } from "react-hot-toast"

const roadmapTemplates = {
  beginner: [
    "Week 1: Learn basic HTML/CSS",
    "Week 2: Build simple static pages",
    "Week 3: Introduction to JavaScript",
    "Week 4: Create a basic interactive app",
    "Week 5: Learn version control with Git",
    "Week 6: Deploy your first project",
  ],
  intermediate: [
    "Week 1: Learn a frontend framework (React/Vue)",
    "Week 2: Build a single-page application",
    "Week 3: Introduction to backend development",
    "Week 4: Create a full-stack application",
    "Week 5: Learn about databases",
    "Week 6: Deploy a full-stack project",
  ],
  advanced: [
    "Week 1: Advanced algorithms practice",
    "Week 2: System design concepts",
    "Week 3: Build a complex application",
    "Week 4: Optimize performance",
    "Week 5: Learn about microservices",
    "Week 6: Contribute to open source",
  ],
}

export default function Roadmap() {
  const [skillLevel, setSkillLevel] = useState("beginner")
  const [roadmap, setRoadmap] = useState([])

  const generateRoadmap = () => {
    setRoadmap(roadmapTemplates[skillLevel])
    toast.success("Roadmap generated!")
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Learning Roadmap</h1>
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
        <button
          onClick={generateRoadmap}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Generate Roadmap
        </button>
      </div>

      {roadmap.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)} Roadmap
          </h2>
          <div className="space-y-3">
            {roadmap.map((step, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-300"
              >
                <p className="font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}