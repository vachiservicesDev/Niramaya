# Deployment Guide - Niramaya

## Prerequisites

Before deploying Niramaya to production, ensure you have:

- ✅ A Supabase account and project
- ✅ A Vercel account
- ✅ Node.js 18+ installed locally
- ✅ Git repository access

## Step 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

### 1.2 Run Database Migrations

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Link your project:
```bash
supabase link --project-ref your-project-ref
```

3. Run migrations:
```bash
supabase db push
```

Or manually run the migration files in order:
- `supabase/migrations/20251110003908_create_core_schema_v2.sql`
- `supabase/migrations/20251110004540_seed_communities.sql`
- `supabase/migrations/20251110005256_create_test_users_and_data.sql` (optional for test data)

### 1.3 Verify Database Setup

Check that these tables exist in your Supabase dashboard:
- users
- subscriptions
- provider_profiles
- provider_client_links
- journal_entries
- mood_check_ins
- crisis_check_ins
- communities
- community_memberships
- community_posts
- community_comments
- biweekly_reports

### 1.4 Enable Row Level Security (RLS)

All tables should have RLS enabled. Verify in Supabase Dashboard → Authentication → Policies.

## Step 2: Environment Variables

### 2.1 Local Development

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2.2 Vercel Production

Set these environment variables in Vercel Dashboard → Project Settings → Environment Variables:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Found in Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | Found in Supabase Dashboard → Settings → API |

⚠️ **Important**: These must be set as **Production** environment variables.

## Step 3: Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Vite configuration
5. Set environment variables (see Step 2.2)
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 3.1 Vercel Configuration

The `vercel.json` file is already configured with:
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ SPA routing (all routes → index.html)
- ✅ Security headers

### 3.2 Build Settings Verification

In Vercel Dashboard, verify:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node.js Version**: 18.x or higher

## Step 4: Post-Deployment Verification

### 4.1 Test Authentication

1. Visit your deployed URL
2. Click "Sign Up"
3. Create a test account
4. Verify you can:
   - Sign up successfully
   - Receive anonymous handle
   - Access dashboard

### 4.2 Test Database Connection

Verify these features work:
- ✅ User sign up and login
- ✅ Profile creation
- ✅ Mood check-in creation
- ✅ Journal entry creation
- ✅ Community access

### 4.3 Test All Roles

Create and test each role:

**User Role:**
- Sign up as User
- Create mood check-ins
- Write journal entries
- Join communities
- Post in communities

**Provider Role:**
- Sign up as Provider
- Access provider dashboard
- View client statistics (if linked to test client)

**Admin Role:**
- Sign up as Admin
- Access admin features

### 4.4 Verify RLS Policies

Test that users can only access their own data:
1. Create two user accounts
2. Verify User A cannot see User B's data
3. Create provider-client link
4. Verify provider can now access client data

## Step 5: Production Checklist

Before going live, verify:

### Database
- [ ] All migrations applied successfully
- [ ] RLS policies enabled on all tables
- [ ] Test data removed (if applicable)
- [ ] Indexes created for performance

### Application
- [ ] Build completes without errors
- [ ] No console errors in production
- [ ] All routes accessible
- [ ] Authentication works correctly
- [ ] All CRUD operations functional

### Security
- [ ] Environment variables set correctly
- [ ] RLS policies tested
- [ ] API keys secured (not in code)
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Security headers configured

### Performance
- [ ] Images optimized
- [ ] Bundle size reasonable (<500KB gzipped)
- [ ] No unnecessary dependencies
- [ ] Lazy loading configured

### Monitoring
- [ ] Error tracking set up (optional: Sentry)
- [ ] Analytics configured (optional)
- [ ] Uptime monitoring (optional)

## Step 6: Common Issues & Troubleshooting

### Issue: "Missing Supabase environment variables"

**Solution**: 
- Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in Vercel
- Environment variables must start with `VITE_` to be accessible in the frontend
- Redeploy after setting environment variables

### Issue: "404 on page refresh"

**Solution**:
- Verify `vercel.json` rewrites are configured (already done)
- Check that Vercel detected the framework correctly

### Issue: "Authentication not working"

**Solution**:
- Verify Supabase URL and key are correct
- Check that auth is enabled in Supabase Dashboard
- Verify RLS policies allow user creation

### Issue: "Database errors"

**Solution**:
- Check that all migrations ran successfully
- Verify RLS policies are correct
- Check Supabase logs for detailed errors

### Issue: Build fails

**Solution**:
- Run `npm run build` locally first
- Check for TypeScript errors
- Verify all dependencies are installed
- Check Node.js version (18+ required)

## Step 7: Continuous Deployment

### Automatic Deployments

Vercel automatically deploys when you push to your main branch:

1. Push changes to GitHub:
```bash
git add .
git commit -m "Your changes"
git push
```

2. Vercel automatically:
   - Detects the push
   - Runs the build
   - Deploys to production
   - Provides preview URL

### Preview Deployments

Every pull request gets a preview deployment:
- Automatic preview URL
- Test changes before merging
- Same environment as production

## Step 8: Monitoring & Maintenance

### Vercel Analytics

Enable in Vercel Dashboard → Project → Analytics:
- Page views
- Performance metrics
- Error tracking

### Supabase Monitoring

Monitor in Supabase Dashboard:
- Database size
- API requests
- Active connections
- Query performance

### Regular Maintenance

- Update dependencies monthly
- Review security advisories
- Monitor error logs
- Backup database regularly

## Step 9: Scaling Considerations

### Database
- Supabase Free Tier: 500MB database, 2GB bandwidth
- Upgrade to Pro for production use
- Consider connection pooling for high traffic

### Vercel
- Free tier: Good for testing
- Pro tier: Recommended for production
- Enterprise: For high-traffic applications

## Step 10: Support & Resources

### Documentation
- [Vite Docs](https://vitejs.dev/)
- [React Router Docs](https://reactrouter.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)

### Community
- Supabase Discord
- Vercel Discord
- GitHub Issues

---

## Quick Deployment Commands

```bash
# Local development
npm install
npm run dev

# Build locally
npm run build

# Preview production build locally
npm run preview

# Deploy to Vercel
vercel --prod
```

---

**🎉 Your Niramaya app is now deployed!**

Visit your production URL and start using your mental wellness companion.

Remember: This application is for support and wellness tracking. Always include proper disclaimers about professional mental health care.
