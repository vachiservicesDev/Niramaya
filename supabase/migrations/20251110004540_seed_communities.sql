/*
  # Seed Communities

  ## Overview
  Creates initial public communities for users to join

  ## New Records
  - Creates 5 public communities with different focus areas:
    1. General Support - For anyone seeking peer support
    2. Anxiety Support - Focused on anxiety management
    3. Depression Support - For those dealing with depression
    4. Mindfulness & Meditation - Wellness practices
    5. Young Adults - Support for young adults (18-30)

  ## Notes
  - All communities are public by default
  - Users can join freely and participate anonymously
*/

INSERT INTO communities (name, description, is_private)
VALUES 
  (
    'General Support',
    'A welcoming space for anyone seeking peer support and connection. Share your experiences, challenges, and victories in a safe, judgment-free environment.',
    false
  ),
  (
    'Anxiety Support',
    'Connect with others who understand what it''s like to live with anxiety. Share coping strategies, resources, and support each other through difficult moments.',
    false
  ),
  (
    'Depression Support',
    'A safe space for those dealing with depression. You are not alone. Share your journey, find hope in others'' stories, and support each other.',
    false
  ),
  (
    'Mindfulness & Meditation',
    'Explore mindfulness practices, meditation techniques, and wellness strategies. Share tips, experiences, and support each other in building healthy habits.',
    false
  ),
  (
    'Young Adults (18-30)',
    'A community for young adults navigating mental health challenges. Discuss topics relevant to this life stage including career stress, relationships, and identity.',
    false
  )
ON CONFLICT DO NOTHING;
