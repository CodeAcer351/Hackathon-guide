const resources = {
    beginner: [
      {
        title: "freeCodeCamp",
        description: "Free coding tutorials and projects",
        url: "https://www.freecodecamp.org",
        category: "Learning Platform",
      },
      {
        title: "MDN Web Docs",
        description: "Web development documentation",
        url: "https://developer.mozilla.org",
        category: "Documentation",
      },
      {
        title: "Codecademy (Free Tier)",
        description: "Interactive coding lessons",
        url: "https://www.codecademy.com",
        category: "Learning Platform",
      },
    ],
    intermediate: [
      {
        title: "Frontend Mentor",
        description: "Real-world frontend challenges",
        url: "https://www.frontendmentor.io",
        category: "Practice",
      },
      {
        title: "React Documentation",
        description: "Official React docs",
        url: "https://reactjs.org/docs/getting-started.html",
        category: "Documentation",
      },
      {
        title: "Node.js Guides",
        description: "Learn backend development with Node",
        url: "https://nodejs.org/en/docs/guides",
        category: "Learning Resource",
      },
    ],
    advanced: [
      {
        title: "LeetCode",
        description: "Coding interview preparation",
        url: "https://leetcode.com",
        category: "Practice",
      },
      {
        title: "System Design Primer",
        description: "Learn system design concepts",
        url: "https://github.com/donnemartin/system-design-primer",
        category: "Learning Resource",
      },
      {
        title: "Clean Code JavaScript",
        description: "Best practices for JavaScript",
        url: "https://github.com/ryanmcdermott/clean-code-javascript",
        category: "Best Practices",
      },
    ],
  }
  
  export default function Resources() {
    const [skillLevel, setSkillLevel] = useState("beginner")
  
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Developer Resources</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Skill Level
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
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources[skillLevel].map((resource, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{resource.title}</h3>
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mb-2">
                    {resource.category}
                  </span>
                  <p className="text-gray-600 mb-3">{resource.description}</p>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Visit Resource →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }