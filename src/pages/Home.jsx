
import React, { useState, useEffect } from 'react';
import {
  ArrowRight, ShoppingBag, Sparkles, Zap, Shield,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  const premiumImages = [
    { url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Premium Headphones" },
    { url: "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Luxury Watch" },
    { url: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Premium Electronics" },
    { url: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Designer Accessories" },
    { url: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Trendy Fashion" },
    { url: "https://images.pexels.com/photos/7679452/pexels-photo-7679452.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Luxury Perfume" },
    { url: "https://images.pexels.com/photos/4042800/pexels-photo-4042800.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Home Decor" },
    { url: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Classic Handbag" }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev === premiumImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => setCurrentImageIndex(prev => (prev === premiumImages.length - 1 ? 0 : prev + 1));
  const prevImage = () => setCurrentImageIndex(prev => (prev === 0 ? premiumImages.length - 1 : prev - 1));

  const categories = [
    {
      name: "Smartphones & Mobiles",
      image: "https://www.investopedia.com/thmb/CCYRTce_i-KIbocL1k50TpWqKl8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1036256804-6f03495f031246a6b1d86daa43df73ee.jpg",
    },
    {
      name: "Men’s & Women’s Fashion",
      image: "https://www.shutterstock.com/image-photo/young-fashionable-couple-on-blue-260nw-285640730.jpg",
    },
    {
      name: "Electronics & Gadgets",
      image: "https://5.imimg.com/data5/SELLER/Default/2022/7/YT/LT/CY/71864580/im3-jpg.jpg",
    },
    {
      name: "Home & Living",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiLow_Bqu3ViPRF7YKdudMsF-oNoEF2FpqTA&s",
    },
    {
      name: "Bags, Wallets & Accessories",
      image: "https://www.leatherstudio.in/cdn/shop/files/leather_wallet_bag1_40c74011-e2bb-4b50-8de2-3c4eea1423e5.png?v=1734445128&width=3840",
    },
    {
      name: "Beauty & Personal Care",
      image: "https://integrationconsulting.com/wp-content/uploads/2020/07/health-beauty-care-scaled.jpg",
    },
    {
      name: "Toys & Baby Products",
      image: "https://m.media-amazon.com/images/I/61WygT1EWTL._AC_UF894,1000_QL80_.jpg",
    },
    {
      name: "Watches & Wearables",
      image: "https://cdn.mos.cms.futurecdn.net/FkGweMeB7hdPgaSFQdgsfj.jpg",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden min-h-screen">
      {/* Hero Section */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="order-1">
            <div className="flex items-center mb-4 lg:mb-6">
              <Sparkles className="h-5 w-5 lg:h-6 lg:w-6 text-amber-400 mr-2" />
              <span className="text-amber-400 font-medium text-sm lg:text-base">Premium Quality Guaranteed</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-4 lg:mb-6">
              Premium
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Shopping</span>
              Experience
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 mb-6 lg:mb-8 leading-relaxed">
              Discover exceptional products with unmatched quality and service.
              From cutting-edge electronics to premium accessories, we bring you the finest selection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/shop")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-4 w-4 lg:h-5 lg:w-5" />
                Shop Now
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                Explore Collection
                <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative order-2">
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-4 lg:p-8">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <img
                  src={premiumImages[currentImageIndex].url}
                  alt={premiumImages[currentImageIndex].alt}
                  className="w-full h-full object-cover transition-opacity duration-500 rounded-xl"
                  loading="lazy"
                />
                <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition" aria-label="Previous slide">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition" aria-label="Next slide">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {premiumImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentImageIndex ? 'bg-amber-400' : 'bg-white/50'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 w-16 h-16 lg:w-24 lg:h-24 bg-amber-500 rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-2 -left-2 lg:-bottom-4 lg:-left-4 w-20 h-20 lg:w-32 lg:h-32 bg-emerald-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-center">
            <div>
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-emerald-500 rounded-full mx-auto flex items-center justify-center mb-3 lg:mb-4">
                <Sparkles className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-slate-300 text-sm lg:text-base">Curated selection of the finest products from trusted brands</p>
            </div>
            <div>
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-500 rounded-full mx-auto flex items-center justify-center mb-3 lg:mb-4">
                <Zap className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-slate-300 text-sm lg:text-base">Free worldwide shipping on orders over $50</p>
            </div>
            <div>
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-amber-500 rounded-full mx-auto flex items-center justify-center mb-3 lg:mb-4">
                <Shield className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-slate-300 text-sm lg:text-base">Dedicated customer service team ready to help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shop by Category */}
      <section className="bg-white dark:bg-slate-900 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="relative group rounded-xl overflow-hidden cursor-pointer shadow hover:shadow-xl transition"
                onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-3 left-3 text-white font-semibold text-lg drop-shadow-lg">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Homepage;



