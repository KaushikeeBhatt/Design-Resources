import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Session } from '@supabase/supabase-js'
import Avatar from './Avatar';

export default function Account({ session, onProfileUpdate }: { session: Session, onProfileUpdate: () => void }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [fullName, setFullName] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false
    async function getProfile() {
      setLoading(true)
      const { user } = session

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, website, full_name`)
        .eq('id', user.id)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setUsername(data.username)
          setWebsite(data.website)
          setFullName(data.full_name)
        }
      }

      setLoading(false)
    }

    getProfile()

    return () => {
      ignore = true
    }
  }, [session])

  async function updateProfile(updatedProfile: { username?: string | null; website?: string | null; full_name?: string | null; }) {
    try {
      setLoading(true);
      const { user } = session;

      const updates = {
        id: user.id,
        ...updatedProfile,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
      // Avoid showing alert on initial load or silent updates
      if (Object.keys(updatedProfile).length > 0) {
        alert('Profile updated!');
      }
      onProfileUpdate();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteProfile() {
    if (window.confirm('Are you sure you want to delete your profile permanently? This action cannot be undone.')) {
      try {
        setLoading(true);
        const { error } = await supabase.rpc('delete_user');
        if (error) throw error;
        alert('Your profile has been deleted.');
        supabase.auth.signOut();
      } catch (error) {
        if (error instanceof Error) {
          alert(`Error deleting profile: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl p-6">
        <form onSubmit={(e) => {
          e.preventDefault();
          updateProfile({ username, website, full_name: fullName });
        }} className="space-y-6">
          <Avatar
            size={150}
            name={fullName}
          />
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="text" value={session.user.email} disabled className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm cursor-not-allowed text-gray-500" />
          </div>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={fullName || ''}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
            <input
              id="website"
              type="url"
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50" type="submit" disabled={loading}>
              {loading ? 'Updating ...' : 'Update Profile'}
            </button>
          </div>
        </form>
        <div className="border-t border-gray-200 mt-6 pt-6">
            <button onClick={handleDeleteProfile} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50" disabled={loading}>
                {loading ? 'Deleting...' : 'Delete Profile Permanently'}
            </button>
        </div>
      </div>
    </div>
  )
}
