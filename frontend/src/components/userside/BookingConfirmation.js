import React from 'react';
import { useLocation } from 'react-router-dom';

const BookingConfirmation = () => {
  const location = useLocation();
  const { bookingDetails, paymentDetails, shopDetails } = location.state || {};

  if (!bookingDetails || !paymentDetails || !shopDetails) {
    return <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center">No booking information available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <main className="p-8 max-w-4xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-pink-500 mb-6">Booking Confirmation</h1>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-pink-500">Your Booking Summary</h2>
            <div className="mt-4">
              <p><strong>Service:</strong> {bookingDetails.service.serviceName} - ${bookingDetails.service.price}</p>
              <p><strong>Date:</strong> {new Date(bookingDetails.bookingDate).toLocaleDateString()}</p>
              <p><strong>Time Slot:</strong> {bookingDetails.bookingSlot}</p>
              <p><strong>Total Cost:</strong> ${paymentDetails.totalAmount}</p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-pink-500">Service Details</h2>
            <p className="mt-4">Your selected service is a {bookingDetails.service.serviceName}. {bookingDetails.service.description}</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-pink-500">Shop Details</h2>
            <p><strong>Shop Name:</strong> {shopDetails.name}</p>
            <p><strong>Address:</strong> {shopDetails.address}</p>
            <p><strong>Contact:</strong> {shopDetails.contact}</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-pink-500">Thank You!</h2>
            <p className="mt-4">Your booking has been successfully confirmed. We look forward to seeing you!</p>
          </section>

          <section className="mb-6">
            <a
              href="#"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-5 rounded-lg"
              id="download-invoice"
            >
              Download Invoice
            </a>
          </section>
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-300 p-6">
        {/* Footer content (same as in the original BookingConfirmation component) */}
      </footer>
    </div>
  );
};

export default BookingConfirmation;