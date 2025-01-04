import React from 'react';
import { Menu, X, ArrowRight, Shield, Zap, Users, BarChart, Lock, Globe, CheckCircle} from 'lucide-react';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const highlights = [
    "Advanced Analytics Dashboard",
    "Enterprise-Grade Security",
    "24/7 Priority Support"
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption and advanced security protocols to protect your data"
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "Real-time Analytics",
      description: "Instant insights and powerful reporting tools for better decision making"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Team Collaboration",
      description: "Seamless workflows and efficient team coordination tools"
    },
    {
      icon: <BarChart className="w-6 h-6 text-blue-600" />,
      title: "Performance Metrics",
      description: "Comprehensive analytics and KPI tracking dashboard"
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-600" />,
      title: "Access Control",
      description: "Role-based permissions and secure authentication system"
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      title: "Global Scale",
      description: "Enterprise-ready infrastructure with worldwide availability"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                TheOne Branding
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
             
              <a href="/login" className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                Log In
              </a>
              <a href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm">
                Sign Up
              </a>
            </nav>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                <a href="#solutions" className="text-gray-600 hover:text-blue-600 transition">Solutions</a>
                <a href="#enterprise" className="text-gray-600 hover:text-blue-600 transition">Enterprise</a>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition">Pricing</a>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <a href="/login" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg text-center hover:bg-blue-50 transition">
                    Log In
                  </a>
                  <a href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

     <main className="flex-1">
        <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
          {/* Background Patterns */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-10 -top-10 w-[500px] h-[500px] rounded-full bg-blue-50/50"></div>
            <div className="absolute -left-32 top-32 w-[300px] h-[300px] rounded-full bg-indigo-50/50"></div>
            <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-gradient-to-tl from-blue-50/50 to-transparent"></div>
          </div>

          <div className="relative">
            <div className="container mx-auto px-4 pt-20 pb-24">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left Column - Content */}
                  <div className="text-left space-y-8">
                    <div className="inline-block px-4 py-1 bg-blue-50 rounded-full text-blue-700 font-medium text-sm mb-2">
                      #1 Enterprise Solution
                    </div>
                    
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                      Transform Your 
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Enterprise </span>
                      Workflow
                    </h1>
                    
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Empower your organization with our comprehensive suite of enterprise tools. Streamline operations, enhance security, and drive growth with TheOne Branding platform.
                    </p>

                    <div className="space-y-4">
                      {highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <a 
                        href="/signup" 
                        className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl hover:shadow-blue-100 inline-flex items-center justify-center group"
                      >
                        Get Started
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                      <a 
                        href="/login" 
                        className="px-8 py-4 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition shadow-md border border-gray-200 inline-flex items-center justify-center"
                      >
                        Sign In
                      </a>
                    </div>

                    <div className="pt-8 border-t border-gray-200">
                      <div className="flex items-center gap-6">
                        <div className="flex -space-x-2">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"></div>
                          ))}
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">5000+</div>
                          <div className="text-gray-600">Enterprise customers</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Dashboard Preview */}
                  <div className="relative lg:h-[600px] hidden lg:block">
                    {/* Main Dashboard Preview */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl transform rotate-1 scale-95 opacity-10"></div>
                    <div className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden">
                      <div className="h-12 bg-gray-50 border-b border-gray-200 flex items-center px-4">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 p-4">
                        <div className="h-32 bg-gray-50 rounded-lg"></div>
                        <div className="h-32 bg-gray-50 rounded-lg"></div>
                        <div className="h-32 bg-blue-50 rounded-lg"></div>
                        <div className="h-32 bg-gray-50 rounded-lg"></div>
                      </div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-20 -right-6 w-48 h-24 bg-white rounded-lg shadow-lg p-4 transform rotate-3">
                      <div className="w-full h-4 bg-blue-100 rounded mb-2"></div>
                      <div className="w-3/4 h-4 bg-gray-100 rounded"></div>
                    </div>
                    <div className="absolute bottom-20 -left-6 w-48 h-24 bg-white rounded-lg shadow-lg p-4 transform -rotate-3">
                      <div className="w-full h-4 bg-indigo-100 rounded mb-2"></div>
                      <div className="w-3/4 h-4 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="container mx-auto px-4 pb-20">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 border-t border-gray-200 pt-16">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
                    <div className="text-gray-600">Uptime SLA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                    <div className="text-gray-600">Expert Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
                    <div className="text-gray-600">Integrations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">500K+</div>
                    <div className="text-gray-600">Active Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Enterprise-Grade Features</h3>
              <p className="text-xl text-gray-600">Comprehensive solutions for your business needs</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-600 transition-colors duration-300">
                  <div className="mb-4 bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Business?</h3>
            <div className="flex justify-center items-center space-x-4">
              <a href="/signup" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition shadow-sm">
                Sign Up Now
              </a>
              <a href="/login" className="px-8 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition shadow-sm">
                Log In
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">TheOne Branding</h4>
              <p className="text-sm">Enterprise solutions for modern businesses.</p>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#analytics" className="hover:text-white transition">Analytics</a></li>
                <li><a href="#security" className="hover:text-white transition">Security</a></li>
                <li><a href="#automation" className="hover:text-white transition">Automation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-white transition">About</a></li>
                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                <li><a href="/careers" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy" className="hover:text-white transition">Privacy</a></li>
                <li><a href="/terms" className="hover:text-white transition">Terms</a></li>
                <li><a href="/security" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} TheOne Branding. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}