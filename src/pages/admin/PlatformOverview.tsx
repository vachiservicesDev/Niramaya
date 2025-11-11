import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const PlatformOverview: React.FC = () => {
  const [stats, setStats] = useState({
    users: 0,
    providers: 0,
    sessions: 0,
    uptime: '100%',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id', { count: 'exact' });
      if (usersError) throw usersError;

      const { data: providers, error: providersError } = await supabase
        .from('users')
        .select('id', { count: 'exact' })
        .eq('role', 'Provider');
      if (providersError) throw providersError;

      const { data: sessions, error: sessionsError } = await supabase
        .from('sessions')
        .select('id', { count: 'exact' });
      if (sessionsError) throw sessionsError;

      setStats({
        users: users.length,
        providers: providers.length,
        sessions: sessions.length,
        uptime: '100%',
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Platform Overview</h1>
      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{stats.users}</p>
          </div>
          <div className="stat-card">
            <h3>Total Providers</h3>
            <p>{stats.providers}</p>
          </div>
          <div className="stat-card">
            <h3>Total Sessions</h3>
            <p>{stats.sessions}</p>
          </div>
          <div className="stat-card">
            <h3>Uptime</h3>
            <p>{stats.uptime}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformOverview;
