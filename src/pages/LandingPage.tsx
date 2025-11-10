import { Link } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage() {
  return (
    <div className="landing-page">
      <nav className="nav">
        <div className="container nav-content">
          <h2 className="logo">Niramaya</h2>
          <Link to="/auth" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="container hero-content">
          <h1 className="hero-title">Mental health support, in your pocket</h1>
          <p className="hero-subtitle">
            AI-powered mood coaching, journaling, and community—designed with mental health professionals
          </p>
          <div className="hero-actions">
            <Link to="/auth" className="btn btn-primary btn-large">
              Get Started
            </Link>
            <Link to="/auth?mode=provider" className="btn btn-secondary btn-large">
              I'm a Provider
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Features designed for your wellness</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>AI Companion</h3>
              <p>A gentle conversational partner for people who struggle with social interaction</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Smart Journal</h3>
              <p>AI-powered summaries and patterns from your daily reflections</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Provider Reports</h3>
              <p>Bi-weekly reports that help your therapist focus on what matters most in-session</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Anonymous Communities</h3>
              <p>Peer support in safe, moderated spaces</p>
            </div>
          </div>
        </div>
      </section>

      <section className="disclaimer-section">
        <div className="container">
          <div className="disclaimer">
            <p className="disclaimer-text">
              <strong>Important Notice:</strong> Niramaya does not provide medical care, diagnosis, or crisis intervention.
              If you are in immediate danger, contact your local emergency services or a crisis hotline in your country.
              This application is a support tool designed to complement, not replace, professional mental health care.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Niramaya. Supporting mental wellness through technology.</p>
        </div>
      </footer>
    </div>
  )
}
