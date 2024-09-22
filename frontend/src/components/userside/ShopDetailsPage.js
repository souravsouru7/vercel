import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShopById } from '../../redux/slices/shopSlice';
import { Star, Clock, MapPin, Scissors, Heart, BookOpen } from 'lucide-react';
import {  useNavigate } from 'react-router-dom';
import Layout from './Layout';
const ShopDetailsPage = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentShop, loading, error } = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(fetchShopById(shopId));
  }, [dispatch, shopId]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-900 text-pink-500">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
    </div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen bg-gray-900 text-red-500">Error: {error}</div>;
  }

  if (!currentShop) {
    return <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-200">No shop details available.</div>;
  }
  const handleBookNow = () => {
    navigate(`/booking/${shopId}`);
  };
  return (
    <Layout>
    <main className="bg-gray-900 min-h-screen text-gray-200">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Hero Section */}
        <section className="relative h-96 mb-12 rounded-xl overflow-hidden">
          <img
            src={currentShop.shopimage || '/api/placeholder/1200/400?text=Shop+Image'}
            alt={currentShop.shopName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-5xl font-bold text-white mb-2">{currentShop.shopName}</h1>
            <div className="flex items-center space-x-2 text-yellow-400">
              <Star className="fill-current" />
              <Star className="fill-current" />
              <Star className="fill-current" />
              <Star className="fill-current" />
              <Star />
              <span className="text-white ml-2">(4.2)</span>
            </div>
          </div>
        </section>

        {/* Shop Information */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-pink-500">About Us</h2>
            <p className="text-gray-300 leading-relaxed">{currentShop.description}</p>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-pink-500 flex items-center">
                <Clock className="mr-2" /> Opening Hours
              </h3>
              <p className="text-gray-300">{currentShop.openingHours}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-pink-500 flex items-center">
                <MapPin className="mr-2" /> Location
              </h3>
              <p className="text-gray-300">{currentShop.address}</p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-pink-500">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentShop.services && currentShop.services.map(service => (
              <div key={service._id} className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <Scissors className="text-pink-500 mb-3" />
                <h3 className="text-xl font-semibold mb-2">{service.serviceName}</h3>
               
                <p className="text-gray-400 mb-4">{service.description}</p>
                <p className="text-2xl font-bold text-pink-500">${service.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-pink-500">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <img src="/api/placeholder/40/40" alt="John Doe" className="w-10 h-10 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <div className="flex text-yellow-400">
                    <Star className="fill-current" size={16} />
                    <Star className="fill-current" size={16} />
                    <Star className="fill-current" size={16} />
                    <Star className="fill-current" size={16} />
                    <Star className="fill-current" size={16} />
                  </div>
                </div>
              </div>
              <p className="text-gray-300 italic">"Great service! Will come again."</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <img src="/api/placeholder/40/40" alt="Jane Smith" className="w-10 h-10 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Jane Smith</h4>
                  <div className="flex text-yellow-400">
                    <Star className="fill-current" size={16} />
                    <Star className="fill-current" size={16} />
                    <Star className="fill-current" size={16} />
                    <Star className="fill-current" size={16} />
                    <Star size={16} />
                  </div>
                </div>
              </div>
              <p className="text-gray-300 italic">"Loved the ambiance and the staff."</p>
            </div>
          </div>
        </section>

        {/* Review Form */}
        <section className="mb-12 bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-pink-500">Leave a Review</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="rating" className="block mb-2 text-lg">Rating:</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="cursor-pointer hover:text-yellow-400 transition-colors duration-200" size={24} />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="review-text" className="block mb-2 text-lg">Review:</label>
              <textarea id="review-text" name="review" rows="4" className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent"></textarea>
            </div>
            <button type="submit" className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-400 transition-colors duration-200">Submit Review</button>
          </form>
        </section>

        {/* Call to Action */}
        <section className="flex justify-between items-center">
        <button
            onClick={handleBookNow}
            className="flex-1 mr-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-400 transition-colors duration-200 flex items-center justify-center"
          >
            <BookOpen className="mr-2" /> Book Now
          </button>
          <button className="flex-1 ml-4 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-400 transition-colors duration-200 flex items-center justify-center">
            <Heart className="mr-2" /> Add to Favorites
          </button>
        </section>
      </div>

      <footer className="bg-gray-800 text-gray-200 py-8 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 {currentShop.shopName}. All rights reserved.</p>
        </div>
      </footer>
    </main>
    </Layout>
  );
};

export default ShopDetailsPage;