import { Clock, Shield, Star, Truck } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-40 text-primary-foreground bg-gradient-to-r from-primary to-chart-3/70">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Fast & Reliable Parcel Delivery
          </h1>
          <p className="text-xl text-center max-w-2xl mb-8 opacity-90">
            Delivering your packages with care, speed, and precision. Trusted by
            thousands of customers nationwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="bg-primary-foreground text-primary font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition duration-300 text-center"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="border-2 border-primary-foreground text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:bg-primary-foreground hover:text-primary transition duration-300 text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 my-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-card rounded-lg shadow-md">
              <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Next-day and express delivery options available nationwide.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg shadow-md">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-muted-foreground">
                Track your parcels in real-time with our advanced tracking
                system.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg shadow-md">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Handling</h3>
              <p className="text-muted-foreground">
                Your packages are handled with care and security at every step.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg shadow-md">
              <Star className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rated 5 Stars</h3>
              <p className="text-muted-foreground">
                Thousands of satisfied customers rate our service excellent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-primary/70">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-accent-foreground">
            Ready to Send a Package?
          </h2>
          <p className="text-xl text-accent-foreground/90 max-w-2xl mx-auto mb-8">
            Create an account today and experience the fastest, most reliable
            parcel delivery service.
          </p>
          <Link
            to="/register"
            className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition duration-300 inline-block"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
