// src/pages/About.tsx
import { Globe, Heart, Target, Users } from "lucide-react";
import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-12 bg-background text-foreground ">
      <div className="container mx-auto px-4 space-y-20">
        {/* Header Section */}
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold mb-4">
            About Our Delivery Service
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're revolutionizing parcel delivery with technology, dedication,
            and a customer-first approach.
          </p>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col lg:flex-row items-center py-10">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              To provide fast, reliable, and affordable parcel delivery services
              that connect people and businesses across the country.
            </p>
            <p className="text-muted-foreground">
              We believe that timely delivery shouldn't be a luxury but a
              standard service that everyone can access regardless of their
              location.
            </p>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-primary/10 rounded-lg p-6">
              <Target className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-muted-foreground">
                To become the nation's most trusted parcel delivery service,
                known for innovation, reliability, and exceptional customer
                service.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-10">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-card rounded-lg shadow-md">
              <Heart className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p className="text-muted-foreground">
                We prioritize our customers' needs and satisfaction above all
                else.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg shadow-md">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Teamwork</h3>
              <p className="text-muted-foreground">
                We believe in collaborative efforts to achieve exceptional
                results.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg shadow-md">
              <Globe className="w-12 h-12 text-chart-4 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                We're committed to environmentally responsible delivery
                practices.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 ">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">50K+</p>
              <p>Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">200K+</p>
              <p>Deliveries</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">500+</p>
              <p>Delivery Agents</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">98%</p>
              <p>On-time Rate</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-10">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">John Smith</h3>
              <p className="text-primary">CEO & Founder</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Sarah Johnson</h3>
              <p className="text-primary">COO</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Michael Chen</h3>
              <p className="text-primary">CTO</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Emily Rodriguez</h3>
              <p className="text-primary">CFO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
