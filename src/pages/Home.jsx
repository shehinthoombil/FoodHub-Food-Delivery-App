import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Star, Clock } from 'lucide-react';
import { AppContext } from '../components/contexts/context';
import { mockRestaurants, mockMenuItems } from '../components/contexts/context';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Delicious Food
              <span className="block text-orange-600">Delivered Fast</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">Order from your favorite restaurants and get it delivered to your doorstep in minutes.</p>
            <button onClick={() => navigate('/menu')} className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition transform hover:scale-105">
              Order Now
            </button>
          </div>
          <div className="hidden md:block">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop" alt="Food" className="rounded-2xl shadow-2xl" />
          </div>
        </div>
      </div>

      {/* Restaurants */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Restaurants</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRestaurants.map(restaurant => (
            <div key={restaurant.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer">
              <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h3>
                <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span>{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Food Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Dishes</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockMenuItems.slice(0, 4).map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{item.restaurant}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-600">${item.price}</span>
                  <button onClick={() => addToCart(item)} className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default Home
