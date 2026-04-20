export const Contact = () => {
  return (
    <div data-aos="fade-right" data-aos-duration="600" className="contact-page pt-20 pb-20 bg-gray-50 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side: Contact Info */}
          <div className="bg-primary text-white p-10 md:w-1/3 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Info</h2>
              <p className="text-gray-400 mb-8">Fill up the form and our team will get back to you within 24 hours.</p>
              
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <span className="bg-gray-800 p-3 rounded-lg text-xl">📞</span>
                  <span>+20 123 456 789</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="bg-gray-800 p-3 rounded-lg text-xl">📧</span>
                  <span>support@etshh-shop.com</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="bg-gray-800 p-3 rounded-lg text-xl">📍</span>
                  <span>Cairo, Egypt</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="p-10 md:w-2/3">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase">First Name</label>
                  <input type="text" className="border-b-2 border-gray-200 focus:border-black outline-none py-2 transition-colors" placeholder="John" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase">Last Name</label>
                  <input type="text" className="border-b-2 border-gray-200 focus:border-black outline-none py-2 transition-colors" placeholder="Doe" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600 uppercase">Email Address</label>
                <input type="email" className="border-b-2 border-gray-200 focus:border-black outline-none py-2 transition-colors" placeholder="john@example.com" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600 uppercase">Message</label>
                <textarea rows="4" className="border-b-2 border-gray-200 focus:border-black outline-none py-2 resize-none transition-colors" placeholder="How can we help you?"></textarea>
              </div>

              <button className="w-full cursor-pointer bg-primary text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all transform active:scale-95 uppercase tracking-widest">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};