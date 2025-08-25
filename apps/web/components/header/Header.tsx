import React from 'react';
import { Button } from '@repo/ui/components/button';
import Nav from '../navigation/Nav';
import { Heart } from 'lucide-react';


interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`bg-background border-b ${className}`}>
      <nav className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex justify-center items-center gap-2">
              <span className="text-2xl font-bold text-primary">health </span> <Heart size={20} /> 
            </div>
          </div>

          {/* Navigation Links */}
    

          {/* Actions */}
          <div className="flex items-center space-x-4">
                  <Nav className="" />
            <Button variant="default" size="sm">
              Register
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;