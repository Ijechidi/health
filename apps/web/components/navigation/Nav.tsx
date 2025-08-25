"use client"
import React, { useState } from 'react';
import { Button } from '@repo/ui/components/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@repo/ui/components/sheet';
import { Menu,} from 'lucide-react';
import { NavLink, navLinks } from './NavLink';
import { ThemeSwitcher } from '@repo/ui/components/header/theme-switcher';


interface NavProps {
  className?: string;
}

interface NavLinkItemProps {
  link: NavLink;
  onClick?: () => void;
  className?: string;
}

const NavLinkItem: React.FC<NavLinkItemProps> = ({ 
  link, 
  onClick, 
  className = "text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors" 
}) => {
  return (
    <a 
      href={link.href} 
      className={className}
      onClick={onClick}
      {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {link.label}
    </a>
  );
};

const Nav: React.FC<NavProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={className}>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className='flex items-center lg:gap-4'>
            <div className="flex items-baseline  gap-4">
              {navLinks.map((link) => (
                <NavLinkItem className='text-foreground font-bold hover:opacity-40 transition-all ' key={link.id} link={link} />
              ))}
            </div>
            <span >
                <ThemeSwitcher />
            </span>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[250px] gap-4 md:hidden">
            <SheetHeader>
     <ThemeSwitcher />
            </SheetHeader>
            <div className="flex flex-col space-y-4 jusctify-center items-center">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-primary">Navigation</span>
              </div>
              
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <NavLinkItem
                    key={link.id}
                    link={link}
                    onClick={closeMobileMenu}
                    className="text-foreground hover:text-primary px-4 py-3 text-base font-medium transition-colors rounded-md hover:bg-muted block"
                  />
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Nav;