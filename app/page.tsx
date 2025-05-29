import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[url('/images/headerbackground.jpg')] bg-cover bg-center">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] lg:min-h-[80vh] from-gray-100 to-plum-100 py-16">
        <div className="w-[380px] lg:w-full flex flex-col items-center justify-center backdrop-blur-xl lg:backdrop-blur-none rounded-2xl">
          {/* Top SVG Border */}
          <div className="w-full flex justify-center ">
            <svg width="400" height="40" viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 30 Q 50 10, 100 30 T 200 30 T 300 30 T 390 30" stroke="#800020" strokeWidth="2" fill="none"/>
              <circle cx="50" cy="20" r="6" fill="#b06ea5"/>
              <circle cx="350" cy="20" r="6" fill="#b06ea5"/>
              <ellipse cx="200" cy="15" rx="12" ry="8" fill="#c593bc"/>
            </svg>
          </div>
          <div className="text-center py-8 px-4 ">
            <h1 className="text-4xl md:text-6xl font-serif text-burgundy mb-4 tracking-wide">
              Marina & Spencer
            </h1>
            <p className="text-xl md:text-2xl text-plum-900 mb-8 font-semibold">October 25, 2025</p>
            <div className="mt-8 flex justify-center">
              <a
                href="#rsvp"
                className="lg:bg-burgundy bg-[#612f48] text-black lg:text-gray-800 px-8 py-3 rounded-full hover:bg-plum-800 transition-colors shadow-lg shadow-plum-200/40"
              >
                RSVP Now
              </a>
            </div>
          </div>
          {/* Bottom SVG Border */}
          <div className="w-full flex justify-center">
            <svg width="400" height="40" viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 10 Q 50 30, 100 10 T 200 10 T 300 10 T 390 10" stroke="#800020" strokeWidth="2" fill="none"/>
              <circle cx="100" cy="20" r="6" fill="#b06ea5"/>
              <circle cx="300" cy="20" r="6" fill="#b06ea5"/>
              <ellipse cx="200" cy="25" rx="12" ry="8" fill="#c593bc"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-20 bg-[#611729]">
        <div className="max-w-4xl mx-auto px-4 bg-gray-300/80 rounded-lg p-8">
          <h2 className="text-4xl font-serif text-burgundy text-center mb-12">
            Wedding Details
          </h2>
          <div className="grid md:grid-cols-2 gap-12 ">
            <div className="text-center">
              <h3 className="text-xl font-serif text-plum-900 mb-4 font-semibold">Ceremony</h3>
              <p className="text-gray-900">2:00 PM</p>
              <p className="text-gray-900">St. Mary's Church</p>
              <p className="text-gray-900">123 Wedding Lane</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-serif text-plum-900 mb-4 font-semibold">Reception</h3>
              <p className="text-gray-900">5:00 PM</p>
              <p className="text-gray-900">The Grand Ballroom</p>
              <p className="text-gray-900">456 Celebration Ave</p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 bg-plum-50">
        <div className="max-w-2xl mx-auto px-4 bg-gray-300 bg-opacity-50 rounded-lg p-8 border-2 border-[#8E4585]">
          <h2 className="text-3xl font-serif text-burgundy text-center mb-8">
            RSVP
          </h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-plum-900 mb-2 font-semibold">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-plum-200 rounded-lg focus:outline-none focus:border-burgundy text-gray-900 bg-white"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-plum-900 mb-2 font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-plum-200 rounded-lg focus:outline-none focus:border-burgundy text-gray-900 bg-white"
                required
              />
            </div>
            <div>
              <label htmlFor="attending" className="block text-plum-900 mb-2 font-semibold">
                Will you attend?
              </label>
              <select
                id="attending"
                className="w-full px-4 py-2 border border-plum-200 rounded-lg focus:outline-none focus:border-burgundy text-gray-900 bg-white"
                required
              >
                <option value="">Please select</option>
                <option value="yes">Yes, I will attend</option>
                <option value="no">No, I cannot attend</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-1/2 mx-auto flex justify-center bg-burgundy text-black font-semibold py-3 rounded-lg hover:bg-plum-800 transition-colors bg-[#612f48]"
            >
              Submit RSVP
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
