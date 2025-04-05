import { useState } from "react"
import { signInWithGoogle } from "../firebase/config"
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"

export default function Home() {
  const { currentUser } = useAuth()
  const [isLogin, setIsLogin] = useState(true)

  if (currentUser) return <Navigate to="/dashboard" replace />

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      toast.success("Signed in successfully!")
    } catch (error) {
      toast.error("Failed to sign in")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Hackathon Guide
        </h1>
        <p className="text-center mb-8 text-gray-600">
          Your personal assistant for hackathon success
        </p>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="h-5 w-5"
          />
          Sign in with Google
        </button>

        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            {isLogin
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  )
}