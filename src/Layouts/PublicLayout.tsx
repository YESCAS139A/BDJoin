// layouts/PublicLayout.tsx
import { Outlet, Link } from "react-router-dom";

import { token } from "../lib/token";

const PublicLayout = () => {
  const isAuthenticated = token.isAuthenticated();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="text-xl font-bold text-blue-600">
          BDJoin
        </Link>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Link
              to="/home"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to My Feed
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
