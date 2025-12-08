import React, { useState, useEffect } from 'react';
import { ShoppingCart, Leaf, Heart, Award, MapPin, Phone, Facebook, Instagram, ChevronDown, Check, Star } from 'lucide-react';

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg";
  const variants = {
    primary: "bg-gradient-to-r from-green-600 to-green-500 text-white hover:shadow-green-500/30",
    secondary: "bg-white text-green-700 border-2 border-green-600 hover:bg-green-50",
    outline: "border-2 border-yellow-400 text-yellow-900 hover:bg-yellow-400 hover:text-white"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionHeading = ({ children, subtitle }) => (
  <div className="text-center mb-12 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
    <span className="text-green-600 font-bold tracking-wider uppercase text-sm mb-2 block">{subtitle}</span>
    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 relative inline-block">
      {children}
      <span className="absolute -bottom-2 left-0 w-full h-2 bg-yellow-300 opacity-50 rounded-full transform -skew-x-12"></span>
    </h2>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <div 
    className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-green-50 animate-on-scroll opacity-0 translate-y-8"
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
      <Icon size={28} strokeWidth={2.5} />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

const IngredientBadge = ({ text }) => (
  <span className="inline-block bg-green-50 text-green-800 px-4 py-2 rounded-lg font-medium border border-green-200 shadow-sm mr-2 mb-2 hover:bg-green-100 transition-colors cursor-default">
    {text}
  </span>
);

// --- Main App ---

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Reveal animations
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.85) {
          el.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-[#f8faf6] overflow-x-hidden">
      {/* --- Styles for Custom Animations --- */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .clip-curved-bottom { clip-path: ellipse(150% 100% at 50% 0%); }
      `}</style>

      {/* --- Navigation --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="text-green-600" size={32} />
            <span className="text-2xl font-black text-green-800 tracking-tight">TH Food</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">
            <a href="#ve-chung-toi" className="hover:text-green-600 transition-colors">Về sản phẩm</a>
            <a href="#thanh-phan" className="hover:text-green-600 transition-colors">Thành phần</a>
            <a href="#dinh-duong" className="hover:text-green-600 transition-colors">Dinh dưỡng</a>
            <Button variant="primary" className="px-6 py-2 text-sm">
              <ShoppingCart size={18} /> Đặt Ngay
            </Button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-yellow-100 to-green-50 rounded-bl-[10rem] -z-10"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full blur-3xl opacity-50 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-50 animate-float" style={{ animationDelay: '1s' }}></div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll transition-all duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-6">
              <Award size={16} /> Sản phẩm công nghệ cao
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 text-gray-900">
              Nấm Rang Giòn <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-500">SNACK</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              Giòn rụm, không chiên, giữ trọn vị tự nhiên. Món ăn vặt lành mạnh từ Viện Công Nghệ Sinh Học & Thực Phẩm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button>Mua Ngay - 60G</Button>
              <Button variant="secondary">Tìm Hiểu Thêm</Button>
            </div>
            
            <div className="mt-12 flex items-center gap-6 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <Check className="text-green-500" size={18} /> Không chiên dầu
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-green-500" size={18} /> Nguyên liệu tự nhiên
              </div>
            </div>
          </div>

          <div className="relative animate-on-scroll opacity-0 translate-x-8 transition-all duration-1000 delay-300">
            {/* Main Product Image Placeholder */}
            <div className="relative z-10 w-full aspect-square max-w-lg mx-auto animate-float">
               {/* Note: In a real implementation, you would use <img src="/path/to/mushroom.png" /> here. 
                   I've created a CSS art representation of the product bowl based on your image. */}
               <div className="w-full h-full bg-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 flex items-center justify-center border-4 border-white">
                  <div className="w-full h-full rounded-full bg-orange-50 overflow-hidden relative group cursor-pointer">
                    <img 
                      src="https://images.unsplash.com/photo-1504542982818-1635b54289d8?q=80&w=1000&auto=format&fit=crop" 
                      alt="Nấm Rang Giòn" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Badge Overlay */}
                    <div className="absolute top-6 right-6 bg-yellow-400 text-yellow-900 w-20 h-20 rounded-full flex items-center justify-center font-black text-xl shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform">
                      60G
                    </div>
                  </div>
               </div>
            </div>

            {/* Decorative flying elements */}
            <div className="absolute top-10 -left-10 bg-white p-3 rounded-xl shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                <span className="text-2xl">🍄</span>
            </div>
            <div className="absolute bottom-20 -right-4 bg-white p-3 rounded-xl shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
                <span className="text-2xl">🌿</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section id="ve-chung-toi" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Sự Khác Biệt">Tại Sao Chọn TH Food?</SectionHeading>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <FeatureCard 
              icon={Heart}
              title="Rang Giòn Không Chiên"
              desc="Sử dụng công nghệ rang hiện đại giúp nấm giòn tan mà không cần chiên qua dầu mỡ, tốt cho sức khỏe tim mạch."
              delay={0}
            />
            <FeatureCard 
              icon={Leaf}
              title="Nguyên Liệu Tự Nhiên"
              desc="Kết hợp tinh bột sắn, đậu xanh và nấm tươi. Không chất bảo quản độc hại, giữ trọn hương vị thiên nhiên."
              delay={200}
            />
            <FeatureCard 
              icon={Award}
              title="Uy Tín & Chất Lượng"
              desc="Sản phẩm được nghiên cứu và sản xuất bởi Viện Công Nghệ Sinh Học & Thực Phẩm tại TP. HCM."
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* --- Ingredients & Nutrition Split --- */}
      <section id="thanh-phan" className="py-20 bg-green-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Ingredients Side */}
            <div className="animate-on-scroll opacity-0 -translate-x-8 transition-all duration-700">
              <h2 className="text-4xl font-bold mb-8 text-yellow-400">Thành Phần Chọn Lọc</h2>
              <p className="text-green-100 mb-8 text-lg">
                Chúng tôi cam kết minh bạch về nguyên liệu. Mỗi gói 60g chứa đựng sự kết hợp hoàn hảo giữa dinh dưỡng và hương vị.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {['Tinh bột sắn (37%)', 'Bột đậu xanh (7%)', 'Bột mì (6%)', 'Bột nấm (6%)', 'Đường, Muối, Tiêu', 'Bột hành'].map((item, idx) => (
                   <span key={idx} className="bg-green-800 border border-green-600 px-4 py-2 rounded-full text-green-100 hover:bg-green-700 transition-colors">
                     {item}
                   </span>
                ))}
              </div>

              <div className="bg-green-800/50 p-6 rounded-2xl border border-green-700 backdrop-blur-sm">
                <h4 className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
                  <Star size={18} fill="currentColor" /> Hướng dẫn sử dụng & Bảo quản
                </h4>
                <ul className="text-green-100 text-sm space-y-2 list-disc list-inside opacity-90">
                  <li>Dùng ngay sau khi mở nắp.</li>
                  <li>Tiếp xúc lâu với không khí sẽ ảnh hưởng đến độ giòn.</li>
                  <li>Bảo quản nơi thoáng mát, tránh ánh nắng trực tiếp.</li>
                  <li>Hạn sử dụng: <strong>6 tháng</strong> kể từ ngày sản xuất.</li>
                </ul>
              </div>
            </div>

            {/* Nutrition Table Side */}
            <div id="dinh-duong" className="bg-white text-gray-800 p-8 rounded-3xl shadow-2xl animate-on-scroll opacity-0 translate-x-8 transition-all duration-700">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h3 className="text-2xl font-black text-gray-900">Giá Trị Dinh Dưỡng</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Per 100g</span>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'Năng lượng', val: '326 kcal', color: 'bg-yellow-100 text-yellow-700' },
                  { label: 'Protein', val: '8 g', color: 'bg-green-100 text-green-700' },
                  { label: 'Lipid', val: '1.4 g', color: 'bg-blue-100 text-blue-700' },
                  { label: 'Glucid', val: '70 g', color: 'bg-orange-100 text-orange-700' },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center group cursor-default">
                    <span className="font-medium text-gray-600 group-hover:text-green-600 transition-colors">{item.label}</span>
                    <span className={`font-bold px-4 py-1 rounded-lg ${item.color} min-w-[100px] text-center`}>
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400 mb-4">Số liệu được kiểm định bởi Viện Công Nghệ Sinh Học & Thực Phẩm</p>
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=THFood-NamRangGion" 
                  alt="QR Code" 
                  className="w-24 h-24 mx-auto opacity-80 mix-blend-multiply"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-20 bg-yellow-50">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-4xl font-black text-gray-800 mb-6">Sẵn Sàng Thưởng Thức Vị Ngon Giòn Rụm?</h2>
            <p className="text-xl text-gray-600 mb-10">
              Đặt hàng ngay hôm nay để nhận ưu đãi đặc biệt. Giao hàng nhanh chóng tại TP. Hồ Chí Minh.
            </p>
            <div className="flex justify-center gap-4">
               <Button className="text-lg px-10 py-4 shadow-xl shadow-green-600/20">
                 Mua Ngay (60G)
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t-4 border-green-600">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4 text-white">
                <Leaf className="text-green-500" />
                <span className="text-xl font-bold">TH Food</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Mang đến những sản phẩm ăn vặt lành mạnh, nguồn gốc tự nhiên và an toàn cho sức khỏe người tiêu dùng Việt.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Đơn vị sản xuất</h4>
              <p className="text-sm mb-2">Viện Công Nghệ Sinh Học & Thực Phẩm</p>
              <div className="flex gap-4 mt-4">
                 <a href="#" className="hover:text-green-400 transition-colors"><Facebook size={20} /></a>
                 <a href="#" className="hover:text-pink-400 transition-colors"><Instagram size={20} /></a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Liên Hệ</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="text-green-500 shrink-0 mt-1" size={18} />
                  <span>12 Nguyễn Văn Bảo, Phường Hạnh Thông, TP. Hồ Chí Minh.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-green-500 shrink-0" size={18} />
                  <span>Hotline: 090 123 4567 (Hỗ trợ 24/7)</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
            <p>&copy; 2024 TH Food. Xuất xứ Việt Nam.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}