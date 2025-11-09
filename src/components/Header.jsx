import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../components/contexts/context';
import Menu from '../pages/Menu';
import { MenuIcon, X, LogOut } from 'lucide-react';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout, cartCount } = useContext(AppContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                            <MenuIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">FoodHub</span>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <button
                            onClick={() => navigate('/')}
                            className={`${location.pathname === '/'
                                ? 'text-orange-600 font-semibold'
                                : 'text-gray-700'
                                } hover:text-orange-600 transition`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => navigate('/menu')}
                            className={`${location.pathname === '/menu'
                                ? 'text-orange-600 font-semibold'
                                : 'text-gray-700'
                                } hover:text-orange-600 transition`}
                        >
                            Menu
                        </button>
                        <button
                            onClick={() => navigate('/cart')}
                            className={`relative ${location.pathname === '/cart'
                                ? 'text-orange-600 font-semibold'
                                : 'text-gray-700'
                                } hover:text-orange-600 transition`}
                        >
                            Cart
                            {cartCount > 0 && <span className="ml-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
                        </button>
                    </nav>

                    {/* user section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-3">
                                <span className="text-gray-700">Hi, {user.name}</span>
                                <button onClick={logout} className="flex items-center text-gray-600 hover:text-orange-600 transition" title="Logout">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => navigate('/login')} className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition">
                                Login
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-4 py-3 space-y-3">
                        <button onClick={() => { navigate('/home'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-orange-600">Home</button>
                        <button onClick={() => { navigate('/menu'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-orange-600">Menu</button>
                        <button onClick={() => { navigate('/cart'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-orange-600 flex items-center">
                            Cart {cartCount > 0 && <span className="ml-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
                        </button>
                        {user ? (
                            <div className="pt-3 border-t">
                                <p className="text-gray-700 mb-2">Hi, {user.name}</p>
                                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-gray-600 hover:text-orange-600">Logout</button>
                            </div>
                        ) : (
                            <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="w-full bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700">
                                Login
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
