# Production Readiness Checklist

## Pre-Deployment Checklist

Use this checklist before deploying Niramaya to production.

### 1. Database Setup ✅

- [ ] Supabase project created
- [ ] All migrations applied (`supabase db push`)
- [ ] All required tables exist (run `npm run db:health`)
- [ ] Row Level Security (RLS) enabled on all tables
- [ ] RLS policies tested and verified
- [ ] Database indexes created
- [ ] Seed data applied (communities, test data if needed)
- [ ] Test accounts created (for final testing)

### 2. Environment Configuration ✅

- [ ] `.env` file created locally with correct values
- [ ] Vercel environment variables set:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] Environment variables marked as "Production"
- [ ] No sensitive keys in source code
- [ ] `.env` added to `.gitignore`

### 3. Build & Code Quality ✅

- [ ] `npm install` completes successfully
- [ ] `npm run build` completes without errors
- [ ] No TypeScript compilation errors
- [ ] No console warnings in production build
- [ ] All dependencies up to date (or documented exceptions)
- [ ] Security audit passed (`npm audit`)

### 4. Testing ✅

#### Manual Testing - User Role
- [ ] User can sign up successfully
- [ ] User can sign in successfully
- [ ] User receives anonymous handle on signup
- [ ] Mood check-ins save correctly
- [ ] Mood trends display correctly
- [ ] Journal entries create/read/update/delete
- [ ] Communities list loads
- [ ] Can join communities
- [ ] Can create posts (anonymous and public)
- [ ] Can comment on posts
- [ ] AI Companion chat accessible
- [ ] Crisis resources page loads
- [ ] Settings page allows profile updates
- [ ] Anonymous handle can be regenerated
- [ ] Sign out works correctly

#### Manual Testing - Provider Role
- [ ] Provider can sign up successfully
- [ ] Provider dashboard loads
- [ ] Statistics display correctly
- [ ] Client list shows (when clients linked)
- [ ] Can view client details (when linked)
- [ ] Can access client journal entries (with permission)
- [ ] Can access client mood check-ins (with permission)
- [ ] Provider profile can be created/updated
- [ ] Provider has access to user features too

#### Manual Testing - Admin Role
- [ ] Admin can sign up successfully
- [ ] Admin has access to all user features
- [ ] Admin has access to all provider features
- [ ] Admin-specific features work (if implemented)

#### Automated Testing
- [ ] Unit tests pass (`npm run test`)
- [ ] E2E tests pass (`npm run test:e2e`) - or documented as skipped
- [ ] Test coverage is documented

### 5. Security ✅

- [ ] All tables have RLS enabled
- [ ] Users cannot access other users' data (tested)
- [ ] Providers can only access linked clients' data (tested)
- [ ] Anonymous handles protect identity in communities
- [ ] No SQL injection vulnerabilities
- [ ] XSS protection in place (React handles most)
- [ ] CSRF protection in place (Supabase handles)
- [ ] Security headers configured (in `vercel.json`)
- [ ] HTTPS enforced (automatic with Vercel)
- [ ] No API keys exposed in client code

### 6. Performance ✅

- [ ] Bundle size < 500KB gzipped (check build output)
- [ ] Images optimized (if any)
- [ ] Code splitting implemented (Vite handles)
- [ ] No unnecessary dependencies
- [ ] Database queries optimized
- [ ] Indexes created on frequently queried columns
- [ ] Lazy loading for routes (React Router handles)

### 7. User Experience ✅

- [ ] All routes accessible and load correctly
- [ ] 404 page exists or redirects handled
- [ ] Loading states show for async operations
- [ ] Error messages are user-friendly
- [ ] Forms have validation
- [ ] Forms show success/error feedback
- [ ] Navigation is intuitive
- [ ] Mobile responsive (test on actual devices)
- [ ] Tablet responsive
- [ ] Desktop displays properly
- [ ] Consistent styling throughout

### 8. Accessibility ✅

- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Images have alt text
- [ ] Forms have labels
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG standards
- [ ] Screen reader compatible (basic testing)

### 9. Content & Legal ✅

- [ ] Mental health disclaimers visible on all relevant pages
- [ ] Crisis hotlines easily accessible
- [ ] "Not for emergencies" warnings clear
- [ ] Privacy policy added (if required)
- [ ] Terms of service added (if required)
- [ ] Contact information available (if applicable)
- [ ] Copyright/license information correct

### 10. Deployment Configuration ✅

- [ ] `vercel.json` configured correctly
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Framework detected: Vite
- [ ] SPA routing configured (rewrites)
- [ ] Security headers configured
- [ ] Node.js version specified (18+)

### 11. Vercel Deployment ✅

- [ ] GitHub repository connected to Vercel
- [ ] Auto-deployments enabled (optional)
- [ ] Environment variables set in Vercel
- [ ] Production deployment successful
- [ ] Preview deployments working (for PRs)
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic)

### 12. Post-Deployment Verification ✅

- [ ] Production site loads successfully
- [ ] All routes accessible in production
- [ ] Can sign up in production
- [ ] Can sign in in production
- [ ] Supabase connection working in production
- [ ] Database operations work in production
- [ ] No console errors in production
- [ ] Mobile view works in production
- [ ] Test all critical user flows in production

### 13. Monitoring & Maintenance ✅

- [ ] Error tracking configured (Sentry, LogRocket, or similar) - optional
- [ ] Analytics configured (Google Analytics, Plausible, etc.) - optional
- [ ] Uptime monitoring configured (UptimeRobot, Pingdom, etc.) - optional
- [ ] Database backup strategy in place
- [ ] Monitoring dashboard reviewed
- [ ] Performance metrics baseline established

### 14. Documentation ✅

- [ ] README.md updated with deployment info
- [ ] DEPLOYMENT.md created
- [ ] TESTING.md created
- [ ] Environment variables documented
- [ ] Test accounts documented
- [ ] Troubleshooting guide available
- [ ] Architecture documented (if needed)

### 15. Team Readiness ✅

- [ ] Team has access to Supabase dashboard
- [ ] Team has access to Vercel dashboard
- [ ] Team knows how to deploy updates
- [ ] Team knows how to roll back deployments
- [ ] Team knows how to check logs
- [ ] Team knows how to respond to errors
- [ ] Support process defined (if applicable)

---

## Final Go/No-Go Decision

### ✅ Ready for Production if:
- All database checks pass
- All user role tests pass
- All security checks pass
- All critical paths tested manually
- No blocking bugs found
- Team is prepared
- Monitoring is set up

### ❌ Not Ready for Production if:
- Database migrations failing
- RLS policies not working
- Critical bugs found
- Security vulnerabilities exist
- Team not trained
- No rollback plan

---

## Post-Launch Checklist

### First 24 Hours
- [ ] Monitor error logs
- [ ] Check user signups working
- [ ] Verify database operations
- [ ] Monitor performance metrics
- [ ] Check uptime status

### First Week
- [ ] Gather user feedback
- [ ] Fix any critical issues
- [ ] Monitor usage patterns
- [ ] Review analytics
- [ ] Update documentation based on issues

### First Month
- [ ] Review all feedback
- [ ] Plan improvements
- [ ] Update dependencies if needed
- [ ] Review security advisories
- [ ] Optimize based on real usage

---

## Emergency Procedures

### If Site Goes Down
1. Check Vercel status page
2. Check Supabase status page
3. Review recent deployments
4. Check environment variables
5. Roll back to last working version if needed
6. Contact support if third-party issue

### If Database Issues
1. Check Supabase dashboard
2. Review recent migrations
3. Check RLS policies
4. Review error logs
5. Restore from backup if needed

### If Authentication Fails
1. Check Supabase auth settings
2. Verify environment variables
3. Check API keys are valid
4. Review error messages
5. Test with new account

---

## Success Criteria

Production deployment is considered successful when:

1. ✅ Users can sign up and use all features
2. ✅ Providers can access client data (with permission)
3. ✅ No security vulnerabilities detected
4. ✅ Site is fast and responsive
5. ✅ Mobile experience is good
6. ✅ No critical errors in logs
7. ✅ All disclaimers are visible
8. ✅ Crisis resources are accessible
9. ✅ Database performance is good
10. ✅ Team can support and maintain the site

---

**Date Prepared**: {DATE}  
**Prepared By**: {TEAM_MEMBER}  
**Deployment Date**: {PLANNED_DATE}  
**Go-Live Approval**: {APPROVER}

---

*Keep this checklist updated as the application evolves.*
