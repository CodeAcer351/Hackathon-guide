import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { auth } from "../firebase/config"
import { toast } from "react-hot-toast"

export default function Navbar() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await auth.signOut()
      navigate("/")
      toast.success("Signed out successfully")
    } catch (error) {
      toast.error("Error signing out")
    }
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">
                Hackathon Guide
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/dashboard"
                className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Hackathons
              </Link>
              <Link
                to="/dashboard/ideas"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Idea Generator
              </Link>
              <Link
                to="/dashboard/roadmap"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Roadmap
              </Link>
              <Link
                to="/dashboard/resources"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Resources
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={handleSignOut}
                  className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Sign out</span>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-700">
                      {currentUser?.displayName}
                    </span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={currentUser?.photoURL}
                      alt="User profile"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}