import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "./pages/PrivateRoute"
import Home from "./pages/Home"
import Layout from "./components/Layout"
import Hackathons from "./components/Dashboard/Hackathons"
import IdeaGenerator from "./components/Dashboard/IdeaGenerator"
import Roadmap from "./components/Dashboard/Roadmap"
import Resources from "./components/Dashboard/Resources"
import Profile from "./components/Dashboard/Profile"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Hackathons />} />
            <Route path="ideas" element={<IdeaGenerator />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="resources" element={<Resources />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App