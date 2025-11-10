import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase, CrisisSeverity, AIRoutingDecision } from '../lib/supabase'
import Layout from '../components/Layout'
import './CrisisPage.css'

interface Hotline {
  country: string
  name: string
  phone: string
  website?: string
}

const hotlines: Hotline[] = [
  {
    country: 'USA',
    name: '988 Suicide & Crisis Lifeline',
    phone: '988',
    website: 'https://988lifeline.org',
  },
  {
    country: 'USA',
    name: 'Crisis Text Line',
    phone: 'Text HOME to 741741',
  },
  {
    country: 'UK',
    name: 'Samaritans',
    phone: '116 123',
    website: 'https://www.samaritans.org',
  },
  {
    country: 'Canada',
    name: 'Crisis Services Canada',
    phone: '1-833-456-4566',
    website: 'https://www.crisisservicescanada.ca',
  },
  {
    country: 'Australia',
    name: 'Lifeline',
    phone: '13 11 14',
    website: 'https://www.lifeline.org.au',
  },
  {
    country: 'International',
    name: 'International Association for Suicide Prevention',
    phone: 'Find your country',
    website: 'https://www.iasp.info/resources/Crisis_Centres',
  },
]

export default function CrisisPage() {
  const { profile } = useAuth()
  const [severity, setSeverity] = useState<CrisisSeverity>('info')
  const [thoughtsOfSelfHarm, setThoughtsOfSelfHarm] = useState(false)
  const [hasImmediatePlan, setHasImmediatePlan] = useState(false)
  const [showHotlines, setShowHotlines] = useState(false)
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let decision: AIRoutingDecision = 'self_help'

    if (hasImmediatePlan || severity === 'urgent') {
      decision = 'show_hotline'
      setShowHotlines(true)
    } else if (thoughtsOfSelfHarm || severity === 'concerned') {
      decision = 'suggest_contact_provider'
      setShowSuggestion(true)
      setShowHotlines(true)
    }

    try {
      const { error } = await supabase.from('crisis_check_ins').insert([
        {
          user_id: profile?.id,
          severity,
          thoughts_of_self_harm: thoughtsOfSelfHarm,
          has_immediate_plan: hasImmediatePlan,
          ai_routing_decision: decision,
          hotline_country: profile?.country,
        },
      ])

      if (error) throw error
      setSubmitted(true)
    } catch (error) {
      console.error('Error saving crisis check-in:', error)
    }
  }

  return (
    <Layout title="Crisis Resources">
      <div className="crisis-page">
        <div className="crisis-warning">
          <h3 className="crisis-text">Emergency Notice</h3>
          <p className="crisis-text">
            If you're in immediate danger, contact emergency services (911 in US, 999 in UK, 000 in Australia) or a
            crisis hotline now. Niramaya cannot respond to emergencies.
          </p>
        </div>

        {!submitted ? (
          <div className="crisis-form card">
            <h3>How are you doing right now?</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">I'm feeling:</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="severity"
                      value="info"
                      checked={severity === 'info'}
                      onChange={(e) => setSeverity(e.target.value as CrisisSeverity)}
                    />
                    <span>I'm just looking for information</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="severity"
                      value="concerned"
                      checked={severity === 'concerned'}
                      onChange={(e) => setSeverity(e.target.value as CrisisSeverity)}
                    />
                    <span>I'm feeling really low</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="severity"
                      value="urgent"
                      checked={severity === 'urgent'}
                      onChange={(e) => setSeverity(e.target.value as CrisisSeverity)}
                    />
                    <span>I'm in immediate danger</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={thoughtsOfSelfHarm}
                    onChange={(e) => setThoughtsOfSelfHarm(e.target.checked)}
                  />
                  <span>I'm having thoughts of self-harm</span>
                </label>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={hasImmediatePlan}
                    onChange={(e) => setHasImmediatePlan(e.target.checked)}
                  />
                  <span>I have an immediate plan to harm myself</span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary">
                Get Help
              </button>
            </form>
          </div>
        ) : (
          <div className="response-section">
            {showSuggestion && (
              <div className="suggestion-card card">
                <h3>We're concerned about you</h3>
                <p>Based on what you've shared, we strongly encourage you to:</p>
                <ul>
                  <li>Contact your mental health provider immediately</li>
                  <li>Reach out to a crisis hotline (listed below)</li>
                  <li>Talk to a trusted friend or family member</li>
                  <li>If you have an immediate plan, call emergency services now</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {(showHotlines || !submitted) && (
          <div className="hotlines-section">
            <h3>Crisis Hotlines</h3>
            <div className="hotlines-list">
              {hotlines.map((hotline, index) => (
                <div key={index} className="hotline-card card">
                  <div className="hotline-country">{hotline.country}</div>
                  <h4>{hotline.name}</h4>
                  <p className="hotline-phone">{hotline.phone}</p>
                  {hotline.website && (
                    <a href={hotline.website} target="_blank" rel="noopener noreferrer" className="hotline-link">
                      Visit Website →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
