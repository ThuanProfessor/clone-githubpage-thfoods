import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Leaf, Heart, Award, MapPin, Phone, Facebook, Instagram, Zap, Droplet, X, Factory, ArrowRight, CheckCircle, Mail, Globe, MessageCircle, Send, Gift, Copy, Sparkles } from 'lucide-react';

// --- Helper Components ---

// 1. Confetti Effect (Pháo hoa giấy)
const FireConfetti = () => {
  const colors = ['#22c55e', '#eab308', '#ef4444', '#3b82f6'];
  const confettiCount = 100;
  
  for (let i = 0; i < confettiCount; i++) {
    const el = document.createElement('div');
    el.classList.add('confetti-particle');
    
    // Random properties
    const bg = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100 + 'vw';
    const animDuration = Math.random() * 3 + 2 + 's';
    const size = Math.random() * 8 + 4 + 'px';
    
    el.style.backgroundColor = bg;
    el.style.left = left;
    el.style.width = size;
    el.style.height = size;
    el.style.animationDuration = animDuration;
    el.style.position = 'fixed';
    el.style.top = '-10px';
    el.style.zIndex = '9999';
    el.style.borderRadius = '50%';
    el.style.pointerEvents = 'none';
    
    document.body.appendChild(el);
    
    setTimeout(() => {
      el.remove();
    }, 5000);
  }
};

const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// 2. 3D Tilt Card Component
const TiltCard = ({ children, className = "" }) => {
    const [transform, setTransform] = useState("");
    const [shadow, setShadow] = useState("");

    const handleMouseMove = (e) => {
        // Disable tilt on mobile for better scrolling performance
        if (window.innerWidth < 768) return;

        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; 
        const rotateY = ((x - centerX) / centerX) * 10;

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
        setShadow(`0 20px 40px rgba(0,0,0,0.2), 0 0 20px rgba(34, 197, 94, 0.2)`);
    };

    const handleMouseLeave = () => {
        setTransform("perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)");
        setShadow("");
    };

    return (
        <div 
            className={`transition-all duration-200 ease-out transform-gpu will-change-transform ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform, boxShadow: shadow }}
        >
            {children}
        </div>
    );
};

// --- UPDATED PARALLAX IMAGE WITH SLIDESHOW ANIMATION ---
const ParallaxImage = () => {
  const [offset, setOffset] = useState(0);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  
  const images = [
      "https://res.cloudinary.com/dg5ts9slf/image/upload/v1765197715/Gemini_Generated_Image_jq6u86jq6u86jq6u_copy_unxjyg.png",
      "https://res.cloudinary.com/dg5ts9slf/image/upload/v1765200640/nam-hong-ngoc_atrdhn.jpg"
  ];

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * 0.1);
    window.addEventListener('scroll', handleScroll);

    // Auto change image every 3 seconds
    const interval = setInterval(() => {
        setCurrentImgIdx(prev => (prev + 1) % images.length);
    }, 4000);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        clearInterval(interval);
    };
  }, []);

  return (
    <div 
      className="relative z-10 w-full aspect-square max-w-lg mx-auto"
      style={{ transform: `translateY(${offset}px)` }}
    >
      <div className="w-full h-full bg-white/20 backdrop-blur-md rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.15)] p-6 border border-white/40 flex items-center justify-center animate-float">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-100 to-yellow-50 overflow-hidden relative group cursor-pointer shadow-inner isolate">
            
           {/* Image Slideshow Logic */}
           {images.map((img, index) => (
               <img 
                 key={index}
                 src={img} 
                 alt={`Snack Nấm ${index + 1}`} 
                 className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out will-change-transform transform ${
                     index === currentImgIdx 
                        ? 'opacity-100 scale-100 blur-0' 
                        : 'opacity-0 scale-110 blur-sm'
                 }`}
               />
           ))}

           <div className="absolute top-0 right-0 p-4 bg-yellow-400 text-yellow-900 font-black rounded-bl-3xl shadow-lg z-20">
             NEW
           </div>
           
        </div>
      </div>
      
      {/* Decorative Floating Chips */}
      <div className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl animate-float-delayed z-20">
         <span className="text-4xl">🍄</span>
      </div>
      <div className="absolute bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl animate-float z-20">
         <span className="text-4xl">✨</span>
      </div>
    </div>
  );
};

// --- New Feature: Falling Leaves ---
const FallingLeaves = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {[...Array(12)].map((_, i) => {
        const left = Math.random() * 50; 
        const delay = Math.random() * 8;
        const duration = 10 + Math.random() * 10;
        const size = 15 + Math.random() * 20;
        
        return (
            <div 
                key={i}
                className="absolute top-[-50px] text-green-600/30 animate-falling-leaf"
                style={{
                    left: `${left}%`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                    fontSize: `${size}px`,
                }}
            >
                <Leaf fill="currentColor" strokeWidth={0} />
            </div>
        )
      })}
    </div>
  );
};

// --- Production Process Modal ---
const ProductionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    { title: "Chuẩn bị nguyên liệu", icon: Leaf },
    { title: "Ủ - Phối trộn nguyên liệu", icon: Droplet },
    { title: "Tạo hình - Gia nhiệt sơ bộ", icon: Heart },
    { title: "Sấy - Làm nguội", icon: Heart },
    { title: "Phủ Maltodextrin - Sấy hoàn thiện", icon: Zap },
    { title: "Rang cát", icon: Heart },
    { title: "Thành phẩm", icon: CheckCircle }
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="bg-white rounded-[2rem] p-6 md:p-8 w-full max-w-6xl relative z-10 max-h-[95vh] overflow-y-auto animate-modal-pop shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition-colors z-50">
          <X size={20} />
        </button>
        
        <div className="text-center mb-6">
          <span className="text-green-600 font-bold uppercase tracking-widest text-sm">Trải nghiệm thực tế</span>
          <h3 className="text-3xl font-black text-gray-900 mt-2">Quy Trình Sản Xuất TH Food</h3>
        </div>

        {/* --- KHU VỰC ẢNH SẢN PHẨM MỚI --- */}
        <div className="w-full h-72 md:h-96 bg-gradient-to-b from-green-50 to-white rounded-3xl flex items-center justify-center mb-10 relative overflow-hidden group shadow-inner border border-green-100/50">
            {/* Background Glow */}
            <div className="absolute w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-200/30 via-green-100/10 to-transparent animate-pulse-slow"></div>
            
            {/* Box Image with Floating Effect */}
            <img 
                src="https://res.cloudinary.com/dg5ts9slf/image/upload/v1766207425/4026ebe6-65d0-46ff-9125-7b58706f10c2_r0fqt4.png" 
                alt="Hộp Snack Nấm TH Food" 
                className="h-[85%] md:h-[95%] w-auto object-contain animate-float drop-shadow-2xl z-10 transition-transform duration-700 hover:scale-105 hover:rotate-2"
            />

            {/* Floating Badges */}
            <div className="absolute top-6 right-6 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold shadow-lg animate-bounce z-20">
                New Packaging
            </div>
            
            <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-sm border border-white text-green-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm z-20 flex items-center gap-2">
                <Leaf size={16} /> 100% Tự nhiên
            </div>
        </div>

        {/* Các bước quy trình - Responsive Design Update */}
        <div className="relative mt-8">
            {/* Connecting Lines */}
            {/* Desktop Horizontal Line */}
            <div className="hidden lg:block absolute top-10 left-0 w-full h-1 bg-green-100 -z-10 rounded-full"></div>
            {/* Mobile Vertical Line */}
            <div className="lg:hidden absolute left-[2.35rem] top-4 bottom-4 w-1 bg-green-100 -z-10 rounded-full"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4">
                {steps.map((step, idx) => (
                    <div key={idx} className="group flex lg:flex-col items-center gap-5 lg:gap-4 relative">
                        
                        {/* Icon Circle */}
                        <div className="relative shrink-0">
                            <div className="w-20 h-20 lg:w-20 lg:h-20 bg-white border-4 border-green-50 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white group-hover:border-green-200 group-hover:scale-110 transition-all duration-300 shadow-lg z-10">
                                <step.icon size={32} />
                            </div>
                            {/* Step Number Badge */}
                            <div className="absolute -top-1 -right-1 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-black text-yellow-900 border-2 border-white shadow-sm z-20">
                                {idx + 1}
                            </div>
                        </div>

                        {/* Content Card (Mobile Optimized) */}
                        <div className="flex-1 lg:text-center w-full bg-white lg:bg-transparent p-5 lg:p-0 rounded-2xl border border-gray-100 lg:border-none shadow-sm lg:shadow-none hover:shadow-md lg:hover:shadow-none transition-all duration-300 transform group-hover:-translate-y-1 lg:group-hover:translate-y-0">
                            <h4 className="font-bold text-gray-800 text-lg lg:text-sm xl:text-base leading-tight group-hover:text-green-700 transition-colors">
                                {step.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1 lg:hidden">
                                Bước {idx + 1} trong quy trình
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="mt-12 p-4 bg-yellow-50 rounded-xl flex items-center justify-center gap-3 text-sm font-medium text-yellow-800 border border-yellow-200 shadow-sm">
           <Award size={20} className="shrink-0 text-yellow-600" /> 
           <span>Cam kết: Quy trình khép kín 1 chiều - Đảm bảo ATVSTP tuyệt đối.</span>
        </div>
      </div>
    </div>
  );
};

// --- Voucher Modal ---
const VoucherModal = ({ isOpen, onClose }) => {
    const [copied, setCopied] = useState(false);
    const code = "THFOOD20";

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-gradient-to-br from-white to-green-50 rounded-[2rem] p-8 w-full max-w-md relative z-10 animate-modal-pop shadow-2xl border-4 border-white">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>

                <div className="text-center">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <Gift size={40} className="text-yellow-600" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Chúc Mừng! 🎉</h3>
                    <p className="text-gray-600 mb-6">Bạn đã nhận được mã giảm giá độc quyền cho lần đặt hàng đầu tiên.</p>
                    
                    <div className="bg-white border-2 border-dashed border-green-300 rounded-xl p-4 mb-6 flex items-center justify-between group cursor-pointer hover:border-green-500 transition-colors" onClick={copyCode}>
                        <div className="text-left">
                            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Mã Giảm Giá</span>
                            <p className="text-2xl font-black text-green-600 tracking-widest">{code}</p>
                        </div>
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 group-hover:bg-green-100 group-hover:text-green-600 transition-colors">
                            {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <a 
                            href={`https://zalo.me/0964537055?text=${encodeURIComponent("Chào TH Food, mình muốn dùng mã " + code + " để đặt hàng snack nấm!")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-[#0068FF] hover:bg-[#0054cc] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 transition-transform active:scale-95 flex items-center justify-center gap-2"
                        >
                            <MessageCircle size={20} /> Dùng mã qua Zalo
                        </a>
                        <button onClick={onClose} className="block w-full bg-transparent text-gray-400 hover:text-gray-600 py-2 text-sm font-semibold">
                            Để sau
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- NutriBar ---
const NutriBar = ({ label, value, max, color, icon: Icon, subtext }) => {
    const percent = Math.min((parseFloat(value) / max) * 100, 100);
    return (
        <div className="mb-5 group">
            <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-2 text-gray-700 font-bold">
                    <div className={`p-1.5 rounded-lg ${color.bg} ${color.text}`}>
                        <Icon size={16} />
                    </div>
                    <span>{label}</span>
                </div>
                <div className="text-right">
                    <span className="text-lg font-black text-gray-900">{value}</span>
                    <span className="text-xs text-gray-400 block font-normal">{subtext}</span>
                </div>
            </div>
            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                    className={`h-full ${color.bar} rounded-full transition-all duration-1000 ease-out group-hover:scale-x-105 origin-left`} 
                    style={{ width: `${percent}%` }}
                ></div>
            </div>
        </div>
    )
}

// --- Main App ---

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showProcess, setShowProcess] = useState(false);
  const [showVoucher, setShowVoucher] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleTryNow = () => {
    FireConfetti(); 
    setTimeout(() => {
        setShowVoucher(true);
    }, 500);
  };

  const navItems = [
    { name: 'Trang chủ', id: 'trang-chu' },
    { name: 'Dinh dưỡng', id: 'dinh-duong' },
    { name: 'Thành phần', id: 'thanh-phan' },
    { name: 'Liên hệ', id: 'lien-he' }
  ];

  const ingredients = [
    { 
      name: "Tinh bột sắn", 
      percent: "37%", 
      img: "https://res.cloudinary.com/dg5ts9slf/image/upload/v1765195344/khoai-mi-chua-bao-nhieu-calo-1_d7836adfcebf464ca76a0f20114ff5d8_grande_j2yozl.jpg" 
    },
    { 
      name: "Bột đậu xanh", 
      percent: "7%", 
      img: "https://res.cloudinary.com/dg5ts9slf/image/upload/v1765195344/cach-nau-dau-xanh-nhanh-mem-va-cach-chon-mua-dau-xanh-ngon-bo-avt-1200x676_ha7ivn.jpg" 
    },
    { 
      name: "Bột mì", 
      percent: "6%", 
      img: "https://res.cloudinary.com/dg5ts9slf/image/upload/v1765200522/bot-mi-la-gi-6-loai-bot-mi-lam-banh-thong-dung-hien-nay-202202151057525470_fprrnk.jpg" 
    },
    { 
      name: "Bột nấm", 
      percent: "6%", 
      img: "https://res.cloudinary.com/dg5ts9slf/image/upload/v1765200640/nam-hong-ngoc_atrdhn.jpg" 
    },
    { 
      name: "Gia vị tự nhiên", 
      percent: "<5%", 
      img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80" 
    },
    { 
      name: "Bột hành", 
      percent: "Hương", 
      img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=300&q=80" 
    },
  ];

  return (
    <div className="font-sans text-gray-800 bg-[#f4f7f4] overflow-x-hidden selection:bg-green-200 relative">
      <style>{`
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
        @keyframes float-delayed { 0% { transform: translateY(0px); } 50% { transform: translateY(15px); } 100% { transform: translateY(0px); } }
        @keyframes falling-leaf { 
            0% { transform: translate(0, 0) rotate(0deg); opacity: 0; } 
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translate(60vw, 100vh) rotate(360deg); opacity: 0; } 
        }
        @keyframes confetti-fall {
            0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes modal-pop { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.5; } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite; }
        .animate-falling-leaf { animation: falling-leaf linear infinite; }
        .animate-modal-pop { animation: modal-pop 0.3s ease-out forwards; }
        .animate-pulse-slow { animation: pulse-slow 3s infinite; }
        .confetti-particle { position: fixed; animation: confetti-fall linear forwards; }
        .glass-nav { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.3); }
        .glass-panel { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.5); }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* --- Falling Leaves Effect --- */}
      <FallingLeaves />
      
      {/* --- Modals --- */}
      <ProductionModal isOpen={showProcess} onClose={() => setShowProcess(false)} />
      <VoucherModal isOpen={showVoucher} onClose={() => setShowVoucher(false)} />

      {/* --- Navbar --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 group cursor-pointer" 
            onClick={(e) => scrollToSection(e, 'trang-chu')}
          >
            <div className="bg-green-600 text-white p-2 rounded-lg group-hover:rotate-12 transition-transform shadow-lg">
               <Leaf size={24} />
            </div>
            <span className="text-2xl font-black text-green-900 tracking-tighter">TH<span className="text-yellow-500">FOOD</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full border border-white/50">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={`#${item.id}`} 
                onClick={(e) => scrollToSection(e, item.id)}
                className="px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-green-700 hover:shadow-md transition-all text-gray-600"
              >
                {item.name}
              </a>
            ))}
          </div>

          <button 
            onClick={(e) => scrollToSection(e, 'lien-he')}
            className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-green-600 hover:scale-105 transition-all shadow-lg flex items-center gap-2"
          >
            <ShoppingCart size={16} /> Mua Ngay
          </button>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header id="trang-chu" className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-green-200 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-yellow-200 rounded-full blur-[100px] opacity-40"></div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 lg:order-1 space-y-8">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-green-100 rounded-full text-green-700 text-sm font-bold shadow-sm mb-4">
                <Award size={16} className="text-yellow-500" /> Công nghệ rang không dầu
              </div>
              <h1 className="text-6xl xl:text-8xl font-black text-gray-900 leading-[0.9] tracking-tight">
                <span className="block w-fit bg-yellow-400 text-yellow-900 px-4 py-1 rounded-tr-2xl rounded-bl-2xl text-2xl xl:text-3xl font-extrabold mb-4 tracking-widest shadow-lg transform -rotate-1">
                    SNACK
                </span>
                NẤM <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-400">RANG GIÒN</span>
              </h1>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200}>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed font-medium">
                Vị ngon nguyên bản từ thiên nhiên. Giòn rụm, bổ dưỡng và hoàn toàn không chiên. Món snack "healthy" cho lối sống hiện đại.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={400} className="flex flex-wrap gap-4">
               {/* UPGRADED TRY NOW BUTTON */}
               {/* <button 
                 onClick={handleTryNow}
                 className="relative group bg-green-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-green-700 shadow-xl shadow-green-600/30 hover:-translate-y-1 transition-all flex items-center gap-2 overflow-hidden"
               >
                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                 <Sparkles size={20} className="animate-pulse" /> Săn Deal Dùng Thử
               </button> */}
               
               <button 
                 onClick={() => setShowProcess(true)}
                 className="relative group bg-green-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-green-700 shadow-xl shadow-green-600/30 hover:-translate-y-1 transition-all flex items-center gap-2 overflow-hidden"
               >
                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                 <Sparkles size={20} className="animate-pulse" /> Quy trình sản xuất
               </button>
            </RevealOnScroll>

            <RevealOnScroll delay={600} className="pt-8 flex items-center gap-8 border-t border-gray-200/60">
               <div>
                  <p className="text-3xl font-black text-gray-900">60g</p>
                  <p className="text-sm text-gray-500 font-medium">Trọng lượng</p>
               </div>
               <div className="w-px h-10 bg-gray-300"></div>
               <div>
                  <p className="text-3xl font-black text-gray-900">6th</p>
                  <p className="text-sm text-gray-500 font-medium">Hạn sử dụng</p>
               </div>
               <div className="w-px h-10 bg-gray-300"></div>
               <div>
                  <p className="text-3xl font-black text-gray-900">100%</p>
                  <p className="text-sm text-gray-500 font-medium">Tự nhiên</p>
               </div>
            </RevealOnScroll>
          </div>

          <div className="order-1 lg:order-2">
            <ParallaxImage />
          </div>
        </div>
      </header>

      {/* --- REDESIGNED NUTRITION SECTION --- */}
      <section id="dinh-duong" className="py-24 container mx-auto px-6 relative">
        <div className="absolute top-1/2 left-0 w-full h-full bg-green-50/50 -skew-y-3 -z-10"></div>
        
        <RevealOnScroll className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Chỉ Số <span className="text-green-600">Vàng</span></h2>
            <p className="text-gray-500 text-lg">Phân tích dinh dưỡng chi tiết trên 100g sản phẩm</p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
             {/* Left Column: Main Energy Card WITH TILT */}
             <div className="lg:col-span-5">
                {/* --- FIX: Thêm class rounded-[2.5rem] vào TiltCard --- */}
                <TiltCard className="h-full rounded-[2.5rem]">
                    <div className="relative bg-gradient-to-br from-green-600 to-green-800 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl overflow-hidden group h-full">
                        <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-700"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Health Focus</span>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-bold mb-2">Năng Lượng</h3>
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-7xl md:text-8xl font-black tracking-tighter">325</span>
                                <span className="text-2xl font-medium opacity-80">kcal</span>
                            </div>
                            <p className="text-green-100 text-lg leading-relaxed border-t border-white/20 pt-6">
                                Nguồn năng lượng sạch, bền bỉ cho cơ thể. Không gây cảm giác nặng bụng hay tích mỡ thừa.
                            </p>
                            <div className="mt-8 flex gap-3">
                                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm border border-white/20">
                                    💪 Vận động
                                </div>
                                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm border border-white/20">
                                    🧠 Trí não
                                </div>
                            </div>
                        </div>
                        <Zap size={250} className="absolute -bottom-10 -right-10 text-white opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                    </div>
                </TiltCard>
             </div>

             {/* Right Column: Detailed Stats */}
             <div className="lg:col-span-7 space-y-6">
                <RevealOnScroll delay={200} className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 relative overflow-hidden">
                    {/* <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] -z-0"></div> */}
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full -mr-6 -mt-6 opacity-20 bg-red-500 transition-transform group-hover:scale-150 duration-500"></div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-8 relative z-10">Chi tiết thành phần</h4>
                    
                    {/* Protein Bar */}
                    <NutriBar 
                        label="Protein" 
                        value="8g" 
                        max={15}
                        subtext="Giúp xây dựng cơ bắp"
                        icon={Heart} 
                        color={{ bg: "bg-red-100", text: "text-red-600", bar: "bg-gradient-to-r from-red-400 to-red-600" }} 
                    />

                    {/* Lipid Bar */}
                    <NutriBar 
                        label="Lipid" 
                        value="1,27g" 
                        max={10} 
                        subtext="Cực thấp - Tốt cho tim"
                        icon={Droplet} 
                        color={{ bg: "bg-blue-100", text: "text-blue-600", bar: "bg-gradient-to-r from-blue-400 to-blue-600" }} 
                    />

                    {/* Carb Bar */}
                    <NutriBar 
                        label="Carbohydrate" 
                        value="70g" 
                        max={100} 
                        subtext="Năng lượng thiết yếu"
                        icon={Leaf} 
                        color={{ bg: "bg-yellow-100", text: "text-yellow-600", bar: "bg-gradient-to-r from-yellow-400 to-yellow-600" }} 
                    />
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* --- FIX: Thêm class rounded-3xl vào TiltCard --- */}
                    <TiltCard className="rounded-3xl">
                        <div className="glass-panel p-6 rounded-3xl flex items-center gap-4 hover:shadow-lg transition-shadow h-full">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <CheckCircle size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">Không Cholesterol</p>
                                <p className="text-xs text-gray-500">An toàn cho tim mạch</p>
                            </div>
                        </div>
                    </TiltCard>
                    
                    {/* --- FIX: Thêm class rounded-3xl vào TiltCard --- */}
                    <TiltCard className="rounded-3xl">
                        <div className="glass-panel p-6 rounded-3xl flex items-center gap-4 hover:shadow-lg transition-shadow h-full">
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                <Leaf size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">Giàu chất xơ</p>
                                <p className="text-xs text-gray-500">Tốt cho tiêu hóa</p>
                            </div>
                        </div>
                    </TiltCard>
                </div>
             </div>
        </div>
      </section>

      {/* --- Ingredients with Images --- */}
      <section id="thanh-phan" className="py-24 bg-white relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
         
         <div className="container mx-auto px-6 relative z-10">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
             <RevealOnScroll>
               <h2 className="text-4xl font-black text-gray-900">Thành Phần <br/> <span className="text-green-600">Tự Nhiên</span></h2>
             </RevealOnScroll>
             <RevealOnScroll delay={200}>
               <p className="text-gray-500 max-w-md mt-4 md:mt-0">
                  Chúng tôi chỉ sử dụng những nguyên liệu tốt nhất. Không chất bảo quản, không phụ gia độc hại.
               </p>
             </RevealOnScroll>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {ingredients.map((item, idx) => (
                 <RevealOnScroll key={idx} delay={idx * 100} className="relative group overflow-hidden rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-default aspect-[3/4]">
                   {/* Background Image */}
                   <div className="absolute inset-0 bg-gray-200">
                       <img 
                           src={item.img} 
                           alt={item.name} 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                           onError={(e) => {
                               e.target.src = "https://images.unsplash.com/photo-1615485499978-f7b57956372d?auto=format&fit=crop&w=300&q=80"; // Fallback image
                           }}
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                   </div>
                   
                   {/* Content */}
                   <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                       <div className="w-10 h-1 bg-green-500 mb-2"></div>
                       <p className="text-3xl font-bold mb-1">{item.percent}</p>
                       <p className="text-sm font-medium opacity-90">{item.name}</p>
                   </div>
                 </RevealOnScroll>
              ))}
           </div>
         </div>
      </section>

      {/* --- REDESIGNED FOOTER --- */}
      <footer id="lien-he" className="relative mt-24">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[#0f2819] rounded-t-[3rem] z-0">
             {/* Decorative circles in footer */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/20 rounded-full blur-[100px] pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-yellow-600/10 rounded-full blur-[80px] pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20 pb-10">
          
          {/* Top CTA Section */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-20 border-b border-white/10 pb-12">
            <div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Bạn đã sẵn sàng <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">thử ngay chưa?</span></h2>
                <p className="text-green-100/60 max-w-lg text-lg">Liên hệ với chúng tôi để nhận báo giá sỉ và lẻ tốt nhất thị trường.</p>
            </div>
            
            {/* UPDATED CONTACT BUTTONS FOR MOBILE */}
            <div className="mt-8 md:mt-0 flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
                <a href="tel:0964537055" className="bg-white text-green-900 hover:bg-green-400 transition-colors px-8 py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 w-full md:w-auto animate-pulse">
                    <Phone size={24} className="fill-green-900 text-green-900" /> 
                    <span>0964 537 055</span>
                </a>
                
                <div className="flex gap-3 w-full md:w-auto">
                    {/* Zalo Button */}
                    <a 
                        href="https://zalo.me/0964537055" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none bg-[#0068FF] hover:bg-[#0054cc] text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg border border-white/10"
                    >
                        <MessageCircle size={20} /> Zalo
                    </a>
                    
                    {/* Messenger Button */}
                    <a 
                        href="https://www.facebook.com/messages/t/thuan.nguyenhoang.161" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none bg-[#0068FF] hover:bg-[#0054cc] text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg border border-white/10"
                    >
                        <Send size={20} /> Messenger
                    </a>
                </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 text-white">
            
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-6">
                <div className="flex items-center gap-2 mb-6">
                   <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white">
                       <Leaf size={24} />
                   </div>
                   <span className="text-3xl font-black tracking-tight">TH<span className="text-green-400">FOOD</span></span>
                </div>
                <p className="text-green-100/60 leading-relaxed">
                   Sản phẩm kết tinh từ nghiên cứu khoa học và tình yêu nông sản Việt. Mang đến sức khỏe vàng cho gia đình bạn.
                </p>
                <div className="flex gap-3 pt-4">
                   <a href="https://www.facebook.com/thuan.nguyenhoang.161/" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all text-green-400">
                      <Facebook size={20} />
                   </a>
                   <a href="https://www.instagram.com/lowtech.25/" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all text-green-400">
                      <Instagram size={20} />
                   </a>
                   <a href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all text-green-400">
                      <Globe size={20} />
                   </a>
                </div>
            </div>

            {/* Links Column */}
            <div className="lg:col-span-2 lg:col-start-6 space-y-6">
                <h4 className="font-bold text-lg text-white">Liên kết</h4>
                <ul className="space-y-4 text-green-100/60">
                    <li><a href="#trang-chu" className="hover:text-green-400 transition-colors">Trang chủ</a></li>
                    <li><a href="#dinh-duong" className="hover:text-green-400 transition-colors">Giá trị dinh dưỡng</a></li>
                    <li><a href="#thanh-phan" className="hover:text-green-400 transition-colors">Thành phần</a></li>
                    <li><a href="#" className="hover:text-green-400 transition-colors">Chính sách đổi trả</a></li>
                </ul>
            </div>

            {/* Contact Info Column */}
            <div className="lg:col-span-4 lg:col-start-9 space-y-6">
                <h4 className="font-bold text-lg text-white">Thông tin liên hệ</h4>
                
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <MapPin className="text-green-400 shrink-0 mt-1" size={20} />
                        <div>
                            <p className="font-bold text-white text-sm">Địa chỉ sản xuất</p>
                            <p className="text-green-100/60 text-sm mt-1">12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, TP. Hồ Chí Minh.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                        <Mail className="text-green-400 shrink-0 mt-1" size={20} />
                        <div>
                            <p className="font-bold text-white text-sm">Email hỗ trợ</p>
                            <p className="text-green-100/60 text-sm mt-1">hoangthuandev04@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

          </div>
          
          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-green-100/40">
             <p>© 2025 TH Food - Design by BeThuanDeThuong</p>
             <div className="flex gap-6">
                <a href='https://ibf.iuh.edu.vn/vi/' target='_blank' className="hover:text-white cursor-pointer">Industrial University</a>
                <a href='https://github.com/ThuanProfessor' target='_blank' className="hover:text-white cursor-pointer">hoangthuandev</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}