import React from 'react';
import { 
  ShieldIcon, 
  LayoutDashboardIcon, 
  MenuIcon, 
  UsersIcon, 
  SearchIcon, 
  GlobeIcon 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* App Bar */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <ShieldIcon className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-900">
            Crime Data Mining
          </h1>
        </div>

        {/* Right Section */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-slate-700 hover:text-blue-600 transition-colors">Home</a>
          <a href="#" className="text-slate-700 hover:text-blue-600 transition-colors">About</a>
          <a href="#" className="text-slate-700 hover:text-blue-600 transition-colors">Features</a>
          <Link to="/register" className="              flex items-center 
              bg-blue-600 text-white 
              px-4 py-2 
              rounded-lg 
              hover:bg-blue-700 
              transition-colors
              space-x-2">
  Register
</Link>
          
          <Link 
            to="/login"
            className="
              flex items-center 
              bg-blue-600 text-white 
              px-4 py-2 
              rounded-lg 
              hover:bg-blue-700 
              transition-colors
              space-x-2
            "
          >
            <LayoutDashboardIcon className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <button className="md:hidden">
          <MenuIcon className="w-6 h-6 text-slate-700" />
        </button>
      </div>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:mt-12 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-slate-900">
            Intelligent Crime Pattern Analysis
          </h2>
          <p className="text-slate-600 text-lg">
            Leveraging advanced data mining and AI technologies to uncover insights in criminal patterns, 
            supporting law enforcement and legal professionals with data-driven solutions.
          </p>
          
          <div className="flex space-x-4">
            <Link 
              to="/login"
              className="
                flex items-center 
                bg-blue-600 text-white 
                px-6 py-3 
                rounded-lg 
                hover:bg-blue-700 
                transition-colors
                space-x-2
                shadow-md hover:shadow-lg
              "
            >
              <LayoutDashboardIcon className="w-6 h-6" />
              <span>Dashboard</span>
            </Link>
            <a 
              href="#" 
              className="
                flex items-center 
                border border-blue-600 
                text-blue-600 
                px-6 py-3 
                rounded-lg 
                hover:bg-blue-50 
                transition-colors
                space-x-2
              "
            >
              Learn More
            </a>
          </div>
        </div>
        
        <div className="hidden md:flex justify-center">
          <div 
            className="
              w-full max-w-md 
              h-96 
              bg-gradient-to-br from-blue-200 to-indigo-100 
              rounded-xl 
              shadow-lg
              flex items-center justify-center
            "
          >
            <ShieldIcon className="w-32 h-32 text-blue-600 opacity-50" />
          </div>
        </div>
      </main>

      {/* Features Section */}
<section className="py-16">
  <div className="container mx-auto px-4 text-center">
    <h3 className="text-3xl font-bold text-slate-900 mb-8">Key Features</h3>
    <div className="grid md:grid-cols-3 gap-8">
      {/* Feature 1: Data Mining */}
      <div className="flex flex-col items-center space-y-4">
        <SearchIcon className="w-16 h-16 text-blue-600" />
        <h4 className="text-xl font-semibold text-slate-900">Data Mining</h4>
        <p className="text-slate-600">Uncover hidden crime patterns with advanced RAG Applications</p>
      </div>

      {/* Feature 2: Legal Advisor */}
      <div className="flex flex-col items-center space-y-4">
        <UsersIcon className="w-16 h-16 text-blue-600" />
        <h4 className="text-xl font-semibold text-slate-900">AI Legal Advisor</h4>
<p className="text-slate-600">
  Empower legal professionals with AI-driven insights, streamlining case analysis and providing intelligent solutions for legal challenges.
</p>
      </div>

      {/* Feature 3: Country-wise Insights */}
      <div className="flex flex-col items-center space-y-4">
        <GlobeIcon className="w-16 h-16 text-blue-600" />
        <h4 className="text-xl font-semibold text-slate-900">Place-wise Insights</h4>
        <p className="text-slate-600">Access crime data and insights specific to the place for localized decision-making.</p>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-blue-500 text-black py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2024 Crime Data Mining. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
