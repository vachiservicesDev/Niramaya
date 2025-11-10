import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase, MoodLevel } from '../lib/supabase'
import Layout from '../components/Layout'
import './UserHome.css'

export default function UserHome() {
  const { profile } = useAuth()
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null)
  const [moodNotes, setMoodNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [recentMoods, setRecentMoods] = useState<{mood: MoodLevel; created_at: string}[]>([])

  const moods: { value: MoodLevel; label: string; emoji: string }[] = [
    { value: 'very_low', label: 'Very Low', emoji: '😢' },
    { value: 'low', label: 'Low', emoji: '😔' },
    { value: 'neutral', label: 'Neutral', emoji: '😐' },
    { value: 'high', label: 'Good', emoji: '🙂' },
    { value: 'very_high', label: 'Great', emoji: '😊' },
  ]

  useEffect(() => {
    fetchRecentMoods()
  }, [])

  const fetchRecentMoods = async () => {
    try {
      const { data, error } = await supabase
        .from('mood_check_ins')
        .select('mood, created_at')
        .eq('user_id', profile?.id)
        .order('created_at', { ascending: false })
        .limit(7)

      if (error) throw error
      setRecentMoods(data || [])
    } catch (error) {
      console.error('Error fetching moods:', error)
    }
  }

  const handleMoodSubmit = async () => {
    if (!selectedMood) return

    setSaving(true)
    try {
      const { error } = await supabase.from('mood_check_ins').insert([
        {
          user_id: profile?.id,
          mood: selectedMood,
          notes: moodNotes || null,
        },
      ])

      if (error) throw error

      setSaved(true)
      await fetchRecentMoods()
      setTimeout(() => {
        setSaved(false)
        setSelectedMood(null)
        setMoodNotes('')
      }, 2000)
    } catch (error) {
      console.error('Error saving mood:', error)
    } finally {
      setSaving(false)
    }
  }

  const getMoodEmoji = (mood: MoodLevel) => {
    const moodMap: Record<MoodLevel, string> = {
      very_low: '😢',
      low: '😔',
      neutral: '😐',
      high: '🙂',
      very_high: '😊',
    }
    return moodMap[mood]
  }

  return (
    <Layout>
      <div className="user-home">
        <div className="greeting">
          <h1>Hi {profile?.name}, how are you feeling today?</h1>
        </div>

        <div className="mood-checkin-card card">
          <h3>Quick Mood Check-in</h3>
          <div className="mood-selector">
            {moods.map((mood) => (
              <button
                key={mood.value}
                className={`mood-option ${selectedMood === mood.value ? 'selected' : ''}`}
                onClick={() => setSelectedMood(mood.value)}
              >
                <span className="mood-emoji">{mood.emoji}</span>
                <span className="mood-label">{mood.label}</span>
              </button>
            ))}
          </div>
          {selectedMood && (
            <div className="mood-notes">
              <textarea
                className="form-textarea"
                placeholder="Any notes about how you're feeling? (optional)"
                value={moodNotes}
                onChange={(e) => setMoodNotes(e.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={handleMoodSubmit}
                disabled={saving}
              >
                {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Check-in'}
              </button>
            </div>
          )}
        </div>

        {recentMoods.length > 0 && (
          <div className="mood-trends card">
            <h3>Your Recent Mood</h3>
            <div className="mood-timeline">
              {recentMoods.map((entry, index) => (
                <div key={index} className="mood-point">
                  <span className="mood-point-emoji">{getMoodEmoji(entry.mood)}</span>
                  <span className="mood-point-date">
                    {new Date(entry.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
            <p className="mood-trends-note">Track your mood daily to see patterns over time</p>
          </div>
        )}

        <div className="action-cards">
          <Link to="/app/chat" className="action-card card">
            <div className="action-icon">💬</div>
            <h3>Talk to Niramaya</h3>
            <p>Chat with your AI companion</p>
          </Link>

          <Link to="/app/journal" className="action-card card">
            <div className="action-icon">📝</div>
            <h3>Journal</h3>
            <p>Write or review your entries</p>
          </Link>

          <Link to="/app/communities" className="action-card card">
            <div className="action-icon">👥</div>
            <h3>Communities</h3>
            <p>Join anonymous peer support spaces</p>
          </Link>

          <Link to="/app/crisis" className="action-card card crisis-card">
            <div className="action-icon">🆘</div>
            <h3>Crisis Resources</h3>
            <p>If you're not feeling safe, reach out now</p>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
