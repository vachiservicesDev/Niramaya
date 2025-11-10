import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import Layout from '../components/Layout'
import './CommunityDetailPage.css'

interface Post {
  id: string
  title: string
  body: string
  is_anonymous: boolean
  created_at: string
  author: {
    name: string
    anonymous_handle: string | null
  }
  comment_count?: number
}

interface Comment {
  id: string
  body: string
  is_anonymous: boolean
  created_at: string
  author: {
    name: string
    anonymous_handle: string | null
  }
}

export default function CommunityDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [community, setCommunity] = useState<any>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [loading, setLoading] = useState(false)
  const [expandedPost, setExpandedPost] = useState<string | null>(null)
  const [comments, setComments] = useState<Record<string, Comment[]>>({})
  const [commentText, setCommentText] = useState('')
  const [commentAnonymous, setCommentAnonymous] = useState(true)
  const [loadingComments, setLoadingComments] = useState(false)

  useEffect(() => {
    if (id) {
      fetchCommunity()
      fetchPosts()
    }
  }, [id])

  const fetchCommunity = async () => {
    try {
      const { data, error } = await supabase.from('communities').select('*').eq('id', id).maybeSingle()

      if (error) throw error
      if (!data) {
        navigate('/app/communities')
        return
      }

      setCommunity(data)
    } catch (error) {
      console.error('Error fetching community:', error)
    }
  }

  const fetchPosts = async () => {
    try {
      const { data: postsData, error: postsError } = await supabase
        .from('community_posts')
        .select('*, author:users(name, anonymous_handle)')
        .eq('community_id', id)
        .order('created_at', { ascending: false })

      if (postsError) throw postsError
      setPosts((postsData as any) || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const fetchComments = async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from('community_comments')
        .select('*, author:users(name, anonymous_handle)')
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

      if (error) throw error
      setComments((prev) => ({ ...prev, [postId]: (data as any) || [] }))
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const toggleComments = async (postId: string) => {
    if (expandedPost === postId) {
      setExpandedPost(null)
    } else {
      setExpandedPost(postId)
      if (!comments[postId]) {
        await fetchComments(postId)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return

    setLoading(true)
    try {
      const { error } = await supabase.from('community_posts').insert([
        {
          community_id: id,
          author_id: profile?.id,
          title,
          body,
          is_anonymous: isAnonymous,
        },
      ])

      if (error) throw error

      setTitle('')
      setBody('')
      await fetchPosts()
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCommentSubmit = async (postId: string) => {
    if (!commentText.trim()) return

    setLoadingComments(true)
    try {
      const { error } = await supabase.from('community_comments').insert([
        {
          post_id: postId,
          author_id: profile?.id,
          body: commentText,
          is_anonymous: commentAnonymous,
        },
      ])

      if (error) throw error

      setCommentText('')
      await fetchComments(postId)
    } catch (error) {
      console.error('Error creating comment:', error)
    } finally {
      setLoadingComments(false)
    }
  }

  if (!community) {
    return (
      <Layout>
        <p>Loading community...</p>
      </Layout>
    )
  }

  return (
    <Layout title={community.name}>
      <div className="community-detail-page">
        <p className="community-description">{community.description}</p>

        <div className="new-post-card card">
          <h3>Create a Post</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                className="form-textarea"
                rows={6}
                placeholder="What's on your mind?"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>

            <div className="form-footer">
              <label className="checkbox-label">
                <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
                <span>Post anonymously</span>
              </label>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>
        </div>

        <div className="posts-section">
          <h3>Posts</h3>
          {posts.length === 0 ? (
            <p className="empty-state">No posts yet. Be the first to share!</p>
          ) : (
            <div className="posts-list">
              {posts.map((post) => (
                <div key={post.id} className="post-card card">
                  <h4>{post.title}</h4>
                  <p className="post-author">
                    Posted by {post.is_anonymous ? post.author.anonymous_handle || 'Anonymous' : post.author.name} •{' '}
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                  <p className="post-body">{post.body}</p>

                  <button
                    className="btn-link comments-toggle"
                    onClick={() => toggleComments(post.id)}
                  >
                    {expandedPost === post.id ? '▼' : '▶'} Comments {comments[post.id]?.length ? `(${comments[post.id].length})` : ''}
                  </button>

                  {expandedPost === post.id && (
                    <div className="comments-section">
                      <div className="comments-list">
                        {comments[post.id]?.map((comment) => (
                          <div key={comment.id} className="comment">
                            <p className="comment-author">
                              {comment.is_anonymous ? comment.author.anonymous_handle || 'Anonymous' : comment.author.name}
                            </p>
                            <p className="comment-body">{comment.body}</p>
                            <p className="comment-date">{new Date(comment.created_at).toLocaleDateString()}</p>
                          </div>
                        ))}
                      </div>

                      <div className="comment-form">
                        <textarea
                          className="form-textarea"
                          rows={3}
                          placeholder="Write a comment..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        />
                        <div className="comment-form-footer">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={commentAnonymous}
                              onChange={(e) => setCommentAnonymous(e.target.checked)}
                            />
                            <span>Comment anonymously</span>
                          </label>
                          <button
                            className="btn btn-primary btn-small"
                            onClick={() => handleCommentSubmit(post.id)}
                            disabled={loadingComments || !commentText.trim()}
                          >
                            {loadingComments ? 'Posting...' : 'Comment'}
                          </button>
                        </div>
                      </div>
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
