import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-gold via-white to-soft-gold flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-5xl font-bold text-primary-black mb-4">
          Share Your Experience
        </h1>
        <p className="text-xl text-gray-700 mb-12">
          Help us improve by sharing your feedback
        </p>

        <Link
          to="/feedback"
          className="card hover:shadow-xl transition-all duration-300 hover:scale-105 group block"
        >
          <div className="bg-primary-gold p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageSquare className="w-10 h-10 text-primary-black" />
          </div>
          <h2 className="text-2xl font-bold text-primary-black mb-2">Give Feedback</h2>
          <p className="text-gray-600">
            Rate your salon experience and help us improve
          </p>
        </Link>
      </div>
    </div>
  );
};
