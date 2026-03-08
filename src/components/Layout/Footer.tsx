import Facebook from "@/assets/icon/Facebook";
import Instagram from "@/assets/icon/Instagram";
import Linkedin from "@/assets/icon/Linkedin";
import Twitter from "@/assets/icon/Twitter";
import { Package } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card text-foreground border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link
              to="/"
              className="flex items-center text-primary font-bold text-xl mb-4"
            >
              <Package className="w-8 h-8 mr-2" />
              ParcelDelivery
            </Link>
            <p className="text-muted-foreground mb-4">
              Delivering your packages with care, speed, and precision. Trusted
              by thousands of customers nationwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition duration-300"
              >
                <Facebook classes="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition duration-300"
              >
                <Twitter classes="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition duration-300"
              >
                <Instagram classes="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition duration-300"
              >
                <Linkedin classes="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition duration-300"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition duration-300"
                >
                  Express Delivery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition duration-300"
                >
                  Standard Delivery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition duration-300"
                >
                  International Shipping
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition duration-300"
                >
                  Package Tracking
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <address className="not-italic text-muted-foreground">
              <p className="mb-2">123 Delivery Street, Suite 456</p>
              <p className="mb-2">New York, NY 10001</p>
              <p className="mb-2">Email: info@parceldelivery.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} ParcelDelivery. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
