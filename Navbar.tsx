'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    subItems: [
      { label: 'Web Development', href: '/services/web-dev' },
      { label: 'Mobile Apps', href: '/services/mobile-apps' },
      { label: 'UI/UX Design', href: '/services/ui-ux' },
    ],
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    subItems: [
      { label: 'Case Studies', href: '/portfolio/case-studies' },
      { label: 'Projects', href: '/portfolio/projects' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? '!bg-black/90 backdrop-blur-xl shadow-2xl shadow-black/50'
          : '!bg-black/70 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* ===== LOGO dengan TEKS ===== */}
          <Link href="/" className="flex items-center space-x-2 group">
            {/* Kotak ikon dengan inisial */}
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
              <div className="absolute inset-0.5 bg-black rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
              <span className="absolute inset-0 flex items-center justify-center !text-white font-bold text-xl">
                M
              </span>
            </div>
            {/* Teks logo (selalu muncul) */}
            <span className="!text-white font-bold text-xl tracking-tight">
              MyBrand<span className="!text-blue-400">.</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.subItems ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1 ${
                        isActive(item.href)
                          ? '!text-white bg-white/10'
                          : '!text-gray-300 hover:!text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    <div
                      className={`absolute top-full left-0 mt-2 w-56 !bg-black/90 backdrop-blur-xl rounded-xl shadow-2xl shadow-black/50 border border-white/5 overflow-hidden transition-all duration-300 transform origin-top ${
                        openDropdown === item.label
                          ? 'opacity-100 scale-100 pointer-events-auto'
                          : 'opacity-0 scale-95 pointer-events-none'
                      }`}
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`block px-4 py-3 text-sm transition-all duration-300 ${
                            isActive(subItem.href)
                              ? '!text-white bg-blue-500/20'
                              : '!text-gray-300 hover:!text-white hover:bg-white/5'
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                      isActive(item.href)
                        ? '!text-white'
                        : '!text-gray-300 hover:!text-white'
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                    )}
                    <span
                      className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                        isActive(item.href) ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}
                    />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="relative px-6 py-2.5 rounded-lg text-sm font-medium !text-white overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">Get Started</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 !text-white" />
            ) : (
              <Menu className="w-6 h-6 !text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-1 border-t border-white/10">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? '!text-white bg-white/10'
                          : '!text-gray-300 hover:!text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openDropdown === item.label ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <div className="ml-4 pl-4 border-l border-white/10 space-y-1 py-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`block px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                              isActive(subItem.href)
                                ? '!text-white bg-white/10'
                                : '!text-gray-300 hover:!text-white hover:bg-white/5'
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? '!text-white bg-white/10'
                        : '!text-gray-300 hover:!text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="block mt-4 px-4 py-3 text-center text-sm font-medium !text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}