export const About = () => {
  return (
    <div data-aos="fade-up" data-aos-duration="600" className="about-page pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Section 1: Header */}
        <div data-aos="fade-up" className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Story</h1>
          <p className="text-gray-500 max-w-2xl mx-auto italic">"Building the future of e-commerce, one product at a time."</p>
        </div>

        {/* Section 2: Content with Image */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="w-full lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
              alt="Our Team" 
              className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              We started as a small team of developers and designers with a passion for high-quality products. 
              Today, we are proud to serve thousands of customers worldwide, providing the best shopping experience possible.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border-l-4 border-black pl-4">
                <h4 className="font-bold text-2xl text-black">10K+</h4>
                <p className="text-gray-500 text-sm uppercase">Happy Customers</p>
              </div>
              <div className="border-l-4 border-black pl-4">
                <h4 className="font-bold text-2xl text-black">500+</h4>
                <p className="text-gray-500 text-sm uppercase">Premium Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};