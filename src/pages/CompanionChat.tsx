import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../components/Layout'
import './CompanionChat.css'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function CompanionChat() {
  const { profile } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi ${profile?.name || 'there'}! I'm Niramaya, your mental wellness companion. I'm here to listen and support you. How are you feeling today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I hear you. Thank you for sharing that with me. Remember, I'm here to listen and provide support, but I'm not a replacement for professional help. If you're experiencing a crisis, please reach out to a mental health professional or crisis hotline. How can I support you today?`,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Layout title="AI Companion">
      <div className="companion-chat">
        <div className="disclaimer">
          <p className="disclaimer-text">
            <strong>Important:</strong> This is not a replacement for a therapist. If you are thinking about hurting
            yourself or others, or feel unsafe, please stop using this app and contact local emergency services or a
            crisis hotline immediately.
          </p>
        </div>

        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.role}`}>
                <div className="message-content">{message.content}</div>
              </div>
            ))}
            {isTyping && (
              <div className="message assistant">
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-container">
            <textarea
              className="chat-input"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={3}
            />
            <button className="btn btn-primary" onClick={handleSend} disabled={!input.trim() || isTyping}>
              Send
            </button>
          </div>
          <button
            className="btn btn-secondary"
            onClick={() => {
              localStorage.setItem('sessionCompleted', 'true');
              alert('Session ended. You will be prompted to rate the app on the home page.');
            }}
          >
            End Session
          </button>
        </div>
      </div>
    </Layout>
  )
}
