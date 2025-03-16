
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X, Users, Calendar, Award, UserPlus, Moon, Star, Rocket } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Rocket className="h-4 w-4 mr-2" /> },
    { name: 'Membership', path: '/membership', icon: <UserPlus className="h-4 w-4 mr-2" /> },
    { name: 'Collaboration', path: '/collaboration', icon: <Users className="h-4 w-4 mr-2" /> },
    { name: 'Credits', path: '/credits', icon: <Award className="h-4 w-4 mr-2" /> },
  ];

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-dark py-2 backdrop-blur-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-2">
              <Moon
                className="h-6 w-6"
              />
            </span>
            <span className="font-bold text-xl text-gray-100">TechnoClubs</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={location.pathname === link.path ? "default" : "ghost"}
                  className={`relative px-3 ${
                    location.pathname === link.path ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'text-gray-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.icon}
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full"></span>
                  )}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/membership">
              <Button className="hidden md:flex button-shine bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 text-white">
                <Star className="w-4 h-4 mr-2" />
                Join Now
              </Button>
            </Link>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-gray-200 hover:text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-dark border-slate-800 w-[270px] sm:w-[300px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                    <span className="font-bold text-xl text-gray-100">Menu</span>
                    <Button variant="ghost" size="icon" onClick={closeMenu} className="text-gray-400 hover:text-white hover:bg-white/10">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>

                  <nav className="flex flex-col space-y-1 mt-6">
                    {navLinks.map((link) => (
                      <Link key={link.path} to={link.path} onClick={closeMenu}>
                        <Button
                          variant={location.pathname === link.path ? "default" : "ghost"}
                          className={`w-full justify-start ${
                            location.pathname === link.path ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'text-gray-200 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {link.icon}
                          {link.name}
                        </Button>
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto pt-6 border-t border-slate-800">
                    <Link to="/membership" onClick={closeMenu}>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0">
                        <Star className="w-4 h-4 mr-2" />
                        Join Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
