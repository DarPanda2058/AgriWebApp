import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between mb-8">
                    <div className="mb-6 md:mb-0">
                        <div className="flex space-x-8">
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                Product
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                Features
                            </a>
                        </div>
                    </div>

                    <div className="mb-6 md:mb-0 font-bold">LOGO</div>

                    <div className="flex space-x-8">
                        <a href="#" className="text-gray-600 hover:text-gray-900">
                            About
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900">
                            Contact Us
                        </a>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8">
                    <div className="flex justify-center space-x-4 mb-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-3 h-3 rounded-full bg-gray-300"></div>
                        ))}
                    </div>
                    <div className="text-center text-sm text-gray-600">
                        <p>© 2023</p>
                        <div className="flex justify-center space-x-4 mt-2">
                            <a href="#" className="hover:text-gray-900">
                                Privacy
                            </a>
                            <span>•</span>
                            <a href="#" className="hover:text-gray-900">
                                Terms
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;