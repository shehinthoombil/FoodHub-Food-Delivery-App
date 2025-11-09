import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../components/contexts/context';
import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft, AlertCircle } from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [removingItemId, setRemovingItemId] = useState(null);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShoppingCart className="w-16 h-16 text-gray-300" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Looks like you haven't added any delicious food yet. Start exploring our menu!
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition transform hover:scale-105 font-semibold"
          >
            Browse Menu
          </button>
          <button
            onClick={() => navigate('/')}
            className="mt-3 block mx-auto text-orange-600 hover:text-orange-700 font-medium"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const deliveryFee = 3.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + deliveryFee + tax;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);


  // Handle quantity update with validation
  const handleQuantityUpdate = (itemId, newQuantity) => {

    const MAX_QUANTITY = 99;

    if (newQuantity > MAX_QUANTITY) {
      alert(`Maximum quantity per item is ${MAX_QUANTITY}`);
      return;
    }

    if (newQuantity < 1) {
      // Show confirmation before removing
      setRemovingItemId(itemId);
      return;
    }

    updateQuantity(itemId, newQuantity);
  };

  // Confirm remove item
  const confirmRemoveItem = (itemId) => {
    removeFromCart(itemId);
    setRemovingItemId(null);
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button
            onClick={() => navigate('/menu')}
            className="flex items-center text-orange-600 hover:text-orange-700 font-medium transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">

            {cart.length > 1 && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center transition"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear Cart
                </button>
              </div>
            )}

            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1 w-full">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-gray-600 mb-2">{item.restaurant}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-orange-600">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-md bg-white hover:bg-gray-200 flex items-center justify-center transition shadow-sm"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4 text-gray-700" />
                      </button>
                      <span className="w-12 text-center font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-md bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center transition shadow-sm"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => setRemovingItemId(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {removingItemId === item.id && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-red-800 font-medium mb-2">
                        Remove {item.name} from cart?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => confirmRemoveItem(item.id)}
                          className="px-4 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => setRemovingItemId(null)}
                          className="px-4 py-1.5 bg-white text-gray-700 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-orange-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => (user ? navigate('/checkout') : navigate('/login'))}
                className="w-full bg-orange-600 text-white py-4 rounded-lg font-semibold hover:bg-orange-700 transition transform hover:scale-105 shadow-lg text-lg"
              >
                {user ? 'Proceed to Checkout' : 'Login to Checkout'}
              </button>

              {!user && (
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Please login to complete your order</span>
                  </p>
                </div>
              )}

              {cartTotal > 50 && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    🎉 You're eligible for free delivery on orders over $50!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Clear Cart?</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to remove all items from your cart? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleClearCart}
                    className="flex-1 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition font-semibold"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-lg hover:bg-gray-300 transition font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
