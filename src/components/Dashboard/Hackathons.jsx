import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase/config"
import HackathonCard from "./HackathonCard"

export default function Hackathons() {
  const [hackathons, setHackathons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        // In a real app, you would fetch from MLH/Devpost APIs
        // For MVP, we'll use mock data
        const mockHackathons = [
          {
            id: "1",
            name: "Global Hack Week",
            organizer: "Major League Hacking",
            date: "2023-10-15",
            deadline: "2023-10-10",
            link: "https://ghw.mlh.io",
          },
          {
            id: "2",
            name: "Hack the North",
            organizer: "University of Waterloo",
            date: "2023-11-20",
            deadline: "2023-11-10",
            link: "https://hackthenorth.com",
          },
        ]
        setHackathons(mockHackathons)
      } catch (error) {
        console.error("Error fetching hackathons:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHackathons()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Upcoming Hackathons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hackathons.map((hackathon) => (
          <div
            key={hackathon.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{hackathon.name}</h2>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Organizer:</span>{" "}
              {hackathon.organizer}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Date:</span> {hackathon.date}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Registration Deadline:</span>{" "}
              {hackathon.deadline}
            </p>
            <a
              href={hackathon.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Learn More →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}