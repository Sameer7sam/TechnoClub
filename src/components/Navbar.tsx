
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X, Users, Calendar, Award, UserPlus, Moon, Star, Rocket, BarChart, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Rocket className="h-4 w-4 mr-2" />, always: true },
    { name: 'Credits', path: '/credits', icon: <Award className="h-4 w-4 mr-2" />, auth: true },
    { name: 'Collaboration', path: '/collaboration', icon: <Users className="h-4 w-4 mr-2" />, auth: true },
    { name: 'Reports', path: '/reports', icon: <BarChart className="h-4 w-4 mr-2" />, auth: true },
  ];

  const filteredNavLinks = navLinks.filter(link => 
    link.always || (link.auth ? isAuthenticated : !isAuthenticated)
  );

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
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
            {filteredNavLinks.map((link) => (
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
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-purple-500/30">
                      <AvatarFallback className="bg-gradient-to-r from-purple-700 to-pink-700 text-white">
                        {user?.name ? getInitials(user.name) : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-card border-purple-500/20" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/credits" className="cursor-pointer">
                      <Award className="mr-2 h-4 w-4" />
                      <span>Credits</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/collaboration" className="cursor-pointer">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Events</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button className="hidden md:flex button-shine bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 text-white">
                  <Star className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}

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

                  {isAuthenticated && (
                    <div className="flex items-center space-x-3 mt-6 p-3 bg-slate-800/30 rounded-lg">
                      <Avatar className="h-10 w-10 border-2 border-purple-500/30">
                        <AvatarFallback className="bg-gradient-to-r from-purple-700 to-pink-700 text-white">
                          {user?.name ? getInitials(user.name) : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user?.name}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                      </div>
                    </div>
                  )}

                  <nav className="flex flex-col space-y-1 mt-6">
                    {filteredNavLinks.map((link) => (
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
                    {isAuthenticated && (
                      <Link to="/profile" onClick={closeMenu}>
                        <Button
                          variant={location.pathname === '/profile' ? "default" : "ghost"}
                          className={`w-full justify-start ${
                            location.pathname === '/profile' ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'text-gray-200 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Button>
                      </Link>
                    )}
                  </nav>

                  <div className="mt-auto pt-6 border-t border-slate-800">
                    {isAuthenticated ? (
                      <Button 
                        className="w-full bg-red-500/20 text-red-300 hover:bg-red-500/30 justify-start"
                        onClick={handleLogout}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                      </Button>
                    ) : (
                      <Link to="/login" onClick={closeMenu} className="w-full">
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0">
                          <Star className="w-4 h-4 mr-2" />
                          Sign In
                        </Button>
                      </Link>
                    )}
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
