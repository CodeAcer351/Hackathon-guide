import { useAuth } from "../../context/AuthContext"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"

export default function Profile() {
  const { currentUser } = useAuth()
  const [skillLevel, setSkillLevel] = useState("beginner")
  const [interests, setInterests] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            const data = docSnap.data()
            setSkillLevel(data.skillLevel || "beginner")
            setInterests(data.interests || "")
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      }
    }

    fetchUserData()
  }, [currentUser])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await setDoc(doc(db, "users", currentUser.uid), {
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        skillLevel,
        interests,
        lastUpdated: new Date(),
      })
      toast.success("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <img
            src={currentUser?.photoURL}
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold">{currentUser?.displayName}</h2>
            <p className="text-gray-600">{currentUser?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill Level
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
              Your Interests
            </label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="What technologies are you interested in?"
            />
            <p className="text-xs text-gray-500 mt-1">
              This will help us personalize your experience
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  )
}