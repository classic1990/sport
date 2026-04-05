import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-black via-gray-900 to-black border-t border-gold/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-gold/10 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-l from-gold/10 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gold to-gold/20 rounded-full blur-xl opacity-50"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-2 rounded-xl border border-gold/30">
                  <img
                    src="/logo.png"
                    alt="SPORTCUT"
                    className="w-10 h-10 object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>
              <div>
                <div className="text-xl font-black text-white">SPORT</div>
                <div className="text-xl font-black text-gradient-gold -mt-1">CUT</div>
              </div>
            </div>

            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              แหล่งรวมไฟล์ PNG นักฟุตบอลคุณภาพ 4K สำหรับกราฟิกดีไซน์เนอร์
              พร้อมโลโก้ทีมและเทมเพลตโปสเตอร์สำเร็จรูป
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="group relative w-10 h-10 bg-gradient-to-br from-gray-900 to-black border border-gold/30 rounded-lg flex items-center justify-center hover:border-gold/50 transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f text-gold group-hover:scale-110 transition-transform"></i>
              </a>
              <a
                href="#"
                className="group relative w-10 h-10 bg-gradient-to-br from-gray-900 to-black border border-gold/30 rounded-lg flex items-center justify-center hover:border-gold/50 transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-gold group-hover:scale-110 transition-transform"></i>
              </a>
              <a
                href="#"
                className="group relative w-10 h-10 bg-gradient-to-br from-gray-900 to-black border border-gold/30 rounded-lg flex items-center justify-center hover:border-gold/50 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-gold group-hover:scale-110 transition-transform"></i>
              </a>
              <a
                href="#"
                className="group relative w-10 h-10 bg-gradient-to-br from-gray-900 to-black border border-gold/30 rounded-lg flex items-center justify-center hover:border-gold/50 transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube text-gold group-hover:scale-110 transition-transform"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 heading-thai">ลิงก์ด่วน</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                >
                  <i className="fas fa-home text-sm group-hover:scale-110 transition-transform"></i>
                  <span>หน้าแรก</span>
                </a>
              </li>
              <li>
                <a
                  href="/pins"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                >
                  <i className="fas fa-images text-sm group-hover:scale-110 transition-transform"></i>
                  <span>คลังรูปภาพ</span>
                </a>
              </li>
              <li>
                <a
                  href="/logos"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                >
                  <i className="fas fa-shield-alt text-sm group-hover:scale-110 transition-transform"></i>
                  <span>โลโก้ทีม</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/login"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                >
                  <i className="fas fa-crown text-sm group-hover:scale-110 transition-transform"></i>
                  <span>เข้าสู่ระบบ</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 heading-thai">สนับสนุน</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                >
                  <i className="fas fa-question-circle text-sm group-hover:scale-110 transition-transform"></i>
                  <span>คำถามที่พบบ่อย</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                >
                  <i className="fas fa-envelope text-sm group-hover:scale-110 transition-transform"></i>
                  <span>ติดต่อเรา</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                >
                  <i className="fas fa-file-alt text-sm group-hover:scale-110 transition-transform"></i>
                  <span>ข้อกำหนดการใช้งาน</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                >
                  <i className="fas fa-shield-alt text-sm group-hover:scale-110 transition-transform"></i>
                  <span>นโยบายความเป็นส่วนตัว</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gold/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} SportCut. All rights reserved. Made with
              <span className="text-gold mx-1">♥</span>
              for football fans
            </div>

            <div className="flex items-center gap-6">
              <span className="text-gray-500 text-sm">Powered by</span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-gold to-gold-dark rounded-full flex items-center justify-center">
                  <i className="fas fa-bolt text-black text-xs"></i>
                </div>
                <span className="text-gold font-bold text-sm">SportCut</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
