import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Loading from './components/Loading';

function App() {
  return (
    <BrowserRouter>
      {/* Navigation Bar */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">MERN User App</h1>
          <nav>
            <a href="/" className="px-3 py-2 hover:bg-white/20 rounded">Home</a>
            <a href="/dashboard" className="px-3 py-2 hover:bg-white/20 rounded">Dashboard</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Suspense fallback={<Loading />}>
          <AppRoutes />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-6 mt-10">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} IVY. All rights reserved.
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
