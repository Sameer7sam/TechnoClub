
import React from 'react';
import { Star, Github, Twitter, Linkedin, Moon } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-space-black border-t border-purple-500/20">
      <div className="container px-6 mx-auto max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Moon className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-lg md:text-xl text-gray-100">Techno Clubs</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              The next-generation digital infrastructure for student-driven tech communities. 
              Empowering multi-chapter organizations to thrive, innovate, and create impact.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-100">Platform</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Use Cases</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Roadmap</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Integrations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-100">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Knowledge Base</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="section-divider mb-8"></div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0">
            &copy; {currentYear} Techno Clubs. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
