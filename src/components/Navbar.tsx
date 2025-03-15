
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X, Users, Calendar, Award, UserPlus } from 'lucide-react';

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
    { name: 'Home', path: '/', icon: <Calendar className="h-4 w-4 mr-2" /> },
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
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
              </svg>
            </span>
            <span className="font-bold text-xl text-gray-900">TechnoClubs</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={location.pathname === link.path ? "default" : "ghost"}
                  className="relative px-3"
                >
                  {link.icon}
                  {link.name}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/membership">
              <Button className="hidden md:flex button-shine">Join Now</Button>
            </Link>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[270px] sm:w-[300px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                    <span className="font-bold text-xl">Menu</span>
                    <Button variant="ghost" size="icon" onClick={closeMenu}>
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>

                  <nav className="flex flex-col space-y-1 mt-6">
                    {navLinks.map((link) => (
                      <Link key={link.path} to={link.path} onClick={closeMenu}>
                        <Button
                          variant={location.pathname === link.path ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          {link.icon}
                          {link.name}
                        </Button>
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto pt-6 border-t border-gray-100">
                    <Link to="/membership" onClick={closeMenu}>
                      <Button className="w-full">Join Now</Button>
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
