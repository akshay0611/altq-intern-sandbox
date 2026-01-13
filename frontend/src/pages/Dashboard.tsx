import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { DashboardStats, StylistPerformance } from '../types';
import { StarRating } from '../components/StarRating';
import { Loader2, TrendingUp, Star, MessageSquare } from 'lucide-react';

export const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [performance, setPerformance] = useState<StylistPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<'7days' | '30days' | 'all'>('30days');

  useEffect(() => {
    loadData();
  }, [timeFilter]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsData, performanceData] = await Promise.all([
        apiService.getDashboardStats(),
        apiService.getStylistPerformance(),
      ]);
      setStats(statsData);
      setPerformance(performanceData);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-gray flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-gold mx-auto mb-4" />
          <p className="text-primary-black">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-gray flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center">
          <p className="text-error-red mb-4">{error}</p>
          <button onClick={loadData} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-gray p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-black mb-2">Command Center</h1>
          <p className="text-gray-600">Monitor staff performance and customer feedback</p>
        </div>

        {/* Time Filter */}
        <div className="mb-6 flex gap-2">
          {(['7days', '30days', 'all'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeFilter === filter
                  ? 'bg-primary-black text-white'
                  : 'bg-white text-primary-black hover:bg-border-gray'
              }`}
            >
              {filter === '7days' ? 'Last 7 Days' : filter === '30days' ? 'Last 30 Days' : 'All Time'}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Reviews</p>
                <p className="text-3xl font-bold text-primary-black">{stats?.totalReviews || 0}</p>
                <p className="text-sm text-gray-500 mt-1">This month</p>
              </div>
              <div className="bg-soft-gold p-4 rounded-full">
                <MessageSquare className="w-8 h-8 text-primary-gold" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Average Rating</p>
                <p className="text-3xl font-bold text-primary-black">
                  {stats?.averageNetworkRating.toFixed(1) || '0.0'}
                </p>
                <div className="mt-2">
                  <StarRating rating={Math.round(stats?.averageNetworkRating || 0)} onRatingChange={() => {}} size="sm" interactive={false} />
                </div>
              </div>
              <div className="bg-soft-gold p-4 rounded-full">
                <Star className="w-8 h-8 text-primary-gold" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">NPS Score</p>
                <p className="text-3xl font-bold text-primary-black">
                  {stats
                    ? Math.round(
                        ((stats.npsBreakdown.promoters - stats.npsBreakdown.detractors) /
                          stats.totalReviews) *
                          100
                      )
                    : 0}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats?.npsBreakdown.promoters || 0} promoters
                </p>
              </div>
              <div className="bg-soft-gold p-4 rounded-full">
                <TrendingUp className="w-8 h-8 text-primary-gold" />
              </div>
            </div>
          </div>
        </div>

        {/* NPS Breakdown - Simple Text Display */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-primary-black mb-4">NPS Breakdown</h2>
          {stats && stats.totalReviews > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-success-green mb-1">
                  {stats.npsBreakdown.promoters}
                </p>
                <p className="text-sm text-gray-600">Promoters</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-3xl font-bold text-primary-gold mb-1">
                  {stats.npsBreakdown.passives}
                </p>
                <p className="text-sm text-gray-600">Passives</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-3xl font-bold text-error-red mb-1">
                  {stats.npsBreakdown.detractors}
                </p>
                <p className="text-sm text-gray-600">Detractors</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No data available</div>
          )}
        </div>

        {/* Performance Table */}
        <div className="card">
          <h2 className="text-xl font-bold text-primary-black mb-4">Stylist Performance Leaderboard</h2>
          {performance.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-gray">
                    <th className="text-left py-3 px-4 font-semibold text-primary-black">Rank</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary-black">Stylist</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary-black">Specialty</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary-black">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {performance.map((stylist, index) => (
                    <tr
                      key={stylist.id}
                      className="border-b border-border-gray hover:bg-neutral-gray transition-colors"
                    >
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                            index === 0
                              ? 'bg-primary-gold text-primary-black'
                              : index === 1
                              ? 'bg-border-gray text-primary-black'
                              : index === 2
                              ? 'bg-soft-gold text-primary-black'
                              : 'bg-neutral-gray text-gray-600'
                          }`}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-neutral-gray flex items-center justify-center overflow-hidden">
                            {stylist.avatarUrl ? (
                              <img
                                src={stylist.avatarUrl}
                                alt={stylist.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-sm">{stylist.name.charAt(0)}</span>
                            )}
                          </div>
                          <span className="font-medium">{stylist.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{stylist.specialty}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">{stylist.averageRating.toFixed(1)}</span>
                          <StarRating
                            rating={Math.round(stylist.averageRating)}
                            onRatingChange={() => {}}
                            size="sm"
                            interactive={false}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">No performance data available</div>
          )}
        </div>
      </div>
    </div>
  );
};
