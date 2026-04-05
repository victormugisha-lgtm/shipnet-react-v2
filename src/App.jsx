import React, { useState, useEffect } from 'react';
import { Share2, Lock, Eye, Sun, Moon, ArrowRight, Heart, MessageCircle, Repeat2, Briefcase, Zap, CheckCircle, X, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('portfolio');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const [posts, setPosts] = useState([
    {
      id: 1,
      type: 'achievement',
      title: 'Just Deployed Fleeks CLI v2.0 🚀',
      description: 'Rewrote the core engine in Rust. Execution speed increased by 400%. The team crushed this sprint. #buildinpublic #engineering',
      date: '2 hours ago',
      likes: 124,
      comments: 18,
      shares: 5
    },
    {
      id: 2,
      type: 'project',
      title: 'OpenClaw Dashboard Concept',
      description: 'Exploring some new data visualization patterns for the admin interface. Thoughts?',
      date: '1 day ago',
      likes: 89,
      comments: 12,
      shares: 2
    }
  ]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const showToast = (message) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newPost = {
      id: Date.now(),
      type: 'achievement',
      title: newTitle,
      description: newDescription,
      date: 'Just now',
      likes: 0,
      comments: 0,
      shares: 0
    };

    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewDescription('');

    showToast('Successfully published to your Proof of Work.');

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0A66C2', '#34C759', '#F5F5F7']
    });
  };

  return (
    <div className="selection:bg-blue-100 selection:text-blue-900 pb-20 min-h-screen">
      
      {/* Toast Notification */}
      <div 
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[200] bg-[#1D1D1F] text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-2 font-medium text-[14px] transition-all duration-300 ${isToastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}
      >
        <CheckCircle className="w-4 h-4 text-green-400" />
        <span>{toastMessage}</span>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 apple-card rounded-none rounded-b-3xl" style={{ backgroundColor: 'var(--apple-card)' }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0A66C2] to-blue-400 flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">ShipNet</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="flex items-center space-x-2 text-sm font-semibold hover:text-[#0A66C2] transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share Profile</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32">
        {/* Profile Header */}
        <div className="apple-card p-6 sm:p-10 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#0A66C2] to-blue-400 opacity-10"></div>
          
          <div className="relative flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 z-10 mt-8">
            <img src="https://ui-avatars.com/api/?name=Victor+Mugisha&background=0A66C2&color=fff&size=120" alt="Profile" className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl shadow-xl border-4 border-white dark:border-gray-800" />
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Victor Mugisha</h1>
                  <p className="text-[#86868B] text-lg mt-1 font-medium">Founder @ Fleeks | Building Universal AI Engineers</p>
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-3">
                  <button className="apple-card px-4 py-2 text-sm font-semibold shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                    Edit Profile
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Ship Work</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-4 text-sm font-medium text-[#86868B]">
                <div className="flex items-center space-x-1">
                  <Briefcase className="w-4 h-4" />
                  <span>Available for advisory</span>
                </div>
                <span>•</span>
                <span>Sydney, AU</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto">
          {['portfolio', 'about', 'activity'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? 'text-[#0A66C2] border-b-2 border-[#0A66C2]' 
                  : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'portfolio' && ' (12)'}
            </button>
          ))}
        </div>

        {/* Content Feed */}
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="apple-card p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${post.type === 'achievement' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                    {post.type === 'achievement' ? <Zap className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[15px]">{post.type === 'achievement' ? 'Shipped a Milestone' : 'Updated a Project'}</h3>
                    <p className="text-xs text-[#86868B]">{post.date} • Public</p>
                  </div>
                </div>
                <button className="text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white p-1">
                  <span className="text-xl leading-none">⋯</span>
                </button>
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-bold tracking-tight mb-2">{post.title}</h2>
                <p className="text-[15px] leading-relaxed text-[#1D1D1F] dark:text-[#A1A1A6]">
                  {post.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 text-sm font-medium text-[#86868B]">
                <div className="flex space-x-6">
                  <button className="flex items-center space-x-2 hover:text-[#0A66C2] transition-colors group">
                    <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-[#0A66C2] transition-colors group">
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-[#0A66C2] transition-colors group">
                    <Repeat2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{post.shares}</span>
                  </button>
                </div>
                <button className="flex items-center space-x-2 text-[#0A66C2] hover:underline font-semibold">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-opacity">
          <div className="bg-[var(--apple-card)] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-bold tracking-tight">Ship New Work</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-[#86868B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreatePost} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#86868B] mb-2">Title</label>
                  <input 
                    type="text" 
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Deployed v2.0 Architecture"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent outline-none transition-all font-medium"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#86868B] mb-2">Description</label>
                  <textarea 
                    required
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="What did you build? What problem did it solve?"
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent outline-none transition-all resize-none font-medium text-[15px]"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-2 text-sm font-medium text-[#86868B]">
                    <Eye className="w-4 h-4" />
                    <span>Visible on public profile</span>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      type="button" 
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2.5 rounded-full font-semibold text-[#86868B] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}