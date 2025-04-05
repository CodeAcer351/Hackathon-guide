import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { toast } from 'react-hot-toast';

export default function Profile() {
  const { currentUser } = useAuth();
  const [skillLevel, setSkillLevel] = useState('beginner');
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            setSkillLevel(data.skillLevel || 'beginner');
            setInterests(data.interests || '');
          }
        } catch (error) {
          toast.error("Error loading profile data");
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Fixed the parenthesis issue here
      await setDoc(doc(db, "users", currentUser.uid), {
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        skillLevel,
        interests,
        lastUpdated: new Date(),
      });
      toast.success("Profile saved successfully!");
    } catch (error) {
      toast.error("Failed to save profile");
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
      
      <div className="flex items-center mb-6">
        <img
          src={currentUser?.photoURL}
          alt="Profile"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h3 className="text-xl font-semibold">{currentUser?.displayName}</h3>
          <p className="text-gray-600">{currentUser?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSaveProfile}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skill Level
          </label>
          <select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={loading}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Interests
          </label>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Web development, AI, Design..."
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}