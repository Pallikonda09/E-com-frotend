// src/components/Footer.jsx
import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-amber-400">About AdiTrends</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              We are a premium e-commerce platform dedicated to bringing you the finest selection of products 
              from around the world. With over a decade of experience in curating exceptional items, we pride 
              ourselves on quality, authenticity, and customer satisfaction.
            </p>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Our mission is to provide an unparalleled shopping experience through carefully selected products, 
              competitive pricing, and outstanding customer service. Every item in our collection meets our 
              strict quality standards.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Shop All</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Sale Items</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Gift Cards</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Track Order</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-300 text-sm">Nizamabad, 503212</p>
                  <p className="text-slate-300 text-sm">Telangana, India</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-slate-300 text-sm">+91 7780189558</p>
                  <p className="text-slate-300 text-xs">Mon-Fri 9AM–8PM IST</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-slate-300 text-sm">AdiTrends03@gmail.com</p>
                  <p className="text-slate-300 text-xs">24/7 Email Support</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-6">
              <h4 className="text-md font-semibold mb-2 text-amber-400">Business Hours</h4>
              <div className="text-slate-300 text-sm space-y-1">
                <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                <p>Saturday: 10:00 AM - 6:00 PM</p>
                <p>Sunday: 12:00 PM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-slate-400 text-sm">© 2025 AdiTrends. All rights reserved.</p>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Return Policy</a>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="text-slate-400 text-sm">Secure payments powered by</span>
            <div className="flex space-x-2">
              <div className="bg-white text-slate-900 px-2 py-1 rounded text-xs font-semibold">VISA</div>
              <div className="bg-white text-slate-900 px-2 py-1 rounded text-xs font-semibold">MC</div>
              <div className="bg-white text-slate-900 px-2 py-1 rounded text-xs font-semibold">AMEX</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
