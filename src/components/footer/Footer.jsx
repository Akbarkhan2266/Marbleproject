import React from 'react';
import Logo from '../header/logo.png'
const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="container p-6 mx-auto">
        <div className="lg:flex">
          <div className="w-full -mx-6 lg:w-2/5">
            <div className="px-6">
              <a href="#" className='sm:mt-5'>
                <img className="w-auto h-7 " src={Logo} alt=""/>
              </a>

              <p className="max-w-sm mt-6 text-gray-500">Join 31,000+ others and never miss out on new tips, tutorials, and more.</p>

              {/* <div className="flex mt-6 -mx-2">
                <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500" aria-label="Reddit">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d=""></path>
                  </svg>
                </a>

                <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500" aria-label="Facebook">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d=""></path>
                  </svg>
                </a>

                <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500" aria-label="Github">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d=""></path>
                  </svg>
                </a>
              </div> */}
            </div>
          </div>

          <div className="mt-6 lg:mt-0 lg:flex-1">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div>
                <h3 className="text-gray-700 uppercase">About</h3>
                <a href="#" className="block mt-2 text-sm text-gray-600 hover:underline">Home</a>
                <a href="#" className="block mt-2 text-sm text-gray-600 hover:underline">About</a>
                <a href="#" className="block mt-2 text-sm text-gray-600 hover:underline">Contact</a>
              </div>

              <div>
                <h3 className="text-gray-700 uppercase">Blog</h3>
                <a href="#" className="block mt-2 text-sm text-gray-600 hover:underline">Marble</a>
                <a href="#" className="block mt-2 text-sm text-gray-600 hover:underline">Handicrafts</a>
                <a href="#" className="block mt-2 text-sm text-gray-600 hover:underline">Stones</a>
              </div>

              <div>
                <h3 className="text-gray-700 uppercase">Products</h3>
                <a href="#" className="block mt-2 text-sm text-gray-600 hover:underline">Book Call</a>
                <a href="#" className="block mt-2 text-sm text-gray-600 hover:underline">Designs</a>
                <a href="#" className="block mt-2 text-sm text-gray-600 hover:underline">Hand-Made</a>
              </div>

              <div>
                <h3 className="text-gray-700 uppercase">Contact</h3>
                <span className="block mt-2 text-sm text-gray-600 hover:underline"><a href="tel:6398647656">6398647656</a></span>
                <span className="block mt-2 text-sm text-gray-600 hover:underline"><a href="mailto:Akhan656500@gmail.com">Akhan656500@gmail.com</a></span>
              </div>
            </div>
          </div>
        </div>

        <hr className="h-px my-6 bg-gray-200 border-none"/>

        <div>
          <p className="text-center text-gray-500">@2025 Design and made by AGS Web Designers😎</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
