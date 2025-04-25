import React from "react";
import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import Qrcode from "../../assets/global/Rickrolling_QR_code.png";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer text-sm">
      <div className="flex justify-evenly mx-auto px-10 py-10">
        {/* Core Features Section */}
        <div className="flex flex-col items-start">
          <p className="footer-title footer-title font-semibold">
            Core Features
          </p>
          <p>Smart Flashcards</p>
          <p>Spaced Repetition</p>
          <p>Personalized Study Paths</p>
          <p>Progress Tracking</p>
          <p>Study Modes (Write, Match, Test)</p>
          <p>Audio & Image Support</p>
          <p>Offline Access</p>
          <p>Flashback for Exams</p>
        </div>

        {/* Resources Section */}
        <div className="flex flex-col items-start">
          <p className="footer-title footer-title font-semibold">Resources</p>
          <p>Help Center</p>
          <p>Study Tips Blog</p>
          <p>Flashcard Templates</p>
          <p>User Guide</p>
          <p>FAQs</p>
        </div>

        {/* Company Info Section */}
        <div className="flex flex-col items-start">
          <p className="footer-title footer-title font-semibold">
            Company / Info
          </p>
          <p>About Us</p>
          <p>Careers</p>
          <p>Press</p>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </div>

        {/* Download / App Access Section */}
        <div className="flex flex-col items-start">
          <p className="footer-title footer-title font-semibold">
            App Download
          </p>
          <div className="flex items-start space-x-4">
            <img src={Qrcode} alt="QrCode" className="h-20" />
            <div className="flex flex-col justify-start space-y-2">
              <p className="bg-gray-300 px-2 flex items-center">
                <IoLogoGooglePlaystore className="inline mr-2" />
                Playstore
              </p>
              <p className="bg-gray-300 px-2 flex items-center">
                <FaApple className="inline mr-2" />
                App Store
              </p>
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="flex flex-col items-start pt-10">
            <p className="footer-title font-semibold">Follow Us</p>
            <div className="flex flex-col">
              <p className="flex items-center py-auto">
                <FaFacebookSquare className="inline mr-2" />
                Facebook
              </p>
              <p className="flex items-center py-auto">
                <FaInstagram className="inline mr-2" />
                Instagram
              </p>
              <p className="flex items-center py-auto">
                <FaTwitter className="inline mr-2" />X
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr class="border-t-2 border-gray-300 mx-20" />
      <div className="flex justify-center gap-5 py-10">
        <p>© 2024 FlashBack. All Rights Reserved .</p>
        <p>Checkout: https://github.com/exzestential/FlashBack</p>
        <p>
          Country & Region: <span className="underline">Singapore</span>
          <span className="underline">Indonesia</span>
          <span className="underline">Thailand</span>
          <span className="underline">Malaysia</span>
          <span className="underline">Vietnam</span>
          <span className="underline">Philippines</span>
          <span className="underline">Brazil</span>
          <span className="underline">México</span>
          <span className="underline">Colombia</span>
          <span className="underline">Chile</span>
          <span className="underline">Taiwan</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
