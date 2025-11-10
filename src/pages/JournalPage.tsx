import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase, MoodLevel } from '../lib/supabase'
import Layout from '../components/Layout'
import './JournalPage.css'

interface JournalEntry {
  id: string
  text: string
  mood: MoodLevel
  mood_tags: string[] | null
  ai_summary: string | null
  ai_risk_score: number | null
  created_at: string
}

export default function JournalPage() {
  const { profile } = useAuth()
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [text, setText] = useState('')
  const [mood, setMood] = useState<MoodLevel>('neutral')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetchingEntries, setFetchingEntries] = useState(true)

  const moods: { value: MoodLevel; label: string }[] = [
    { value: 'very_low', label: 'Very Low' },
    { value: 'low', label: 'Low' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'high', label: 'Good' },
    { value: 'very_high', label: 'Great' },
  ]

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', profile?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setEntries(data || [])
    } catch (error) {
      console.error('Error fetching entries:', error)
    } finally {
      setFetchingEntries(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    setLoading(true)
    try {
      const moodTagsArray = tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      const { error } = await supabase.from('journal_entries').insert([
        {
          user_id: profile?.id,
          text,
          mood,
          mood_tags: moodTagsArray.length > 0 ? moodTagsArray : null,
        },
      ])

      if (error) throw error

      setText('')
      setMood('neutral')
      setTags('')
      await fetchEntries()
    } catch (error) {
      console.error('Error creating entry:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Journal">
      <div className="journal-page">
        <div className="journal-editor card">
          <h3>New Entry</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">How are you feeling?</label>
              <select className="form-input" value={mood} onChange={(e) => setMood(e.target.value as MoodLevel)}>
                {moods.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Tags (comma-separated, optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="anxious, tired, grateful"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">What's on your mind?</label>
              <textarea
                className="form-textarea"
                rows={8}
                placeholder="Write about your thoughts, feelings, or experiences..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Entry'}
            </button>
          </form>
        </div>

        <div className="journal-list">
          <h3>Your Entries</h3>
          {fetchingEntries ? (
            <p>Loading entries...</p>
          ) : entries.length === 0 ? (
            <p className="empty-state">No journal entries yet. Start writing to track your mental wellness journey.</p>
          ) : (
            <div className="entries">
              {entries.map((entry) => (
                <div key={entry.id} className="entry-card card">
                  <div className="entry-header">
                    <span className={`mood-badge mood-${entry.mood}`}>{entry.mood.replace('_', ' ')}</span>
                    <span className="entry-date">{new Date(entry.created_at).toLocaleDateString()}</span>
                  </div>
                  {entry.mood_tags && entry.mood_tags.length > 0 && (
                    <div className="entry-tags">
                      {entry.mood_tags.map((tag, idx) => (
                        <span key={idx} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="entry-text">{entry.text}</p>
                  {entry.ai_summary && (
                    <div className="entry-summary">
                      <strong>AI Summary:</strong> {entry.ai_summary}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
