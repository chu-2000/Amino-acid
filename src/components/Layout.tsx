import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Search, Globe, Mail, Phone, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white hidden sm:block">AMINO<span className="text-blue-500">CORE</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">Products</a>
          <a href="#" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">Applications</a>
          <a href="#" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">Quality Control</a>
          <a href="#" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">About Us</a>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-slate-400">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400">
            <Globe className="w-5 h-5" />
          </Button>
          <div className="h-6 w-px bg-slate-800 hidden sm:block" />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
            Inquiry
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-slate-400">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">AMINO<span className="text-blue-500">CORE</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Leading global supplier of high-purity amino acids for pharmaceutical, nutritional, and industrial applications. Driven by innovation and precision.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Technical Data Sheets</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Safety Data Sheets (MSDS)</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Quality Certifications</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Regulatory Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Logistics & Shipping</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Inquiry Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Expert</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Connect</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>sales@aminocore.bio</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>+86 (0) 571 8888 8888</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:row justify-between gap-4 text-xs text-slate-500">
          <p>© 2024 AminoCore Biopharma Co., Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Section({ children, className = '', id = '' }: { children: ReactNode, className?: string, id?: string }) {
  return (
    <section id={id} className={`py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}
