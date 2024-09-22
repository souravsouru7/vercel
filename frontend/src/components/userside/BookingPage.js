import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, fetchTimeSlots } from '../../redux/slices/shopSlice';
import { saveBooking, savePayment } from '../../redux/slices/bookingSlice';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const BookingPage = () => {
  const { shopId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get state from shop and user slices
  const { services, timeSlots, loading, error } = useSelector((state) => state.shop);
  const user = useSelector((state) => state.auth.user);

  // Local state for selections
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Fetch services and time slots when component loads
  useEffect(() => {
    if (shopId) {
      dispatch(fetchServices(shopId));
      dispatch(fetchTimeSlots(shopId));
    }
  }, [dispatch, shopId]);

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: `/booking/${shopId}` } });
    }
  }, [user, navigate, shopId]);

  // Get available dates from the timeSlots array
  const availableDates = [...new Set(timeSlots.map(slot => new Date(slot.date).toDateString()))];

  // Filter time slots based on the selected date
  const availableTimeSlotsForDate = selectedDate
    ? timeSlots.filter(slot => new Date(slot.date).toDateString() === selectedDate)
    : [];

  // Get details for the selected service
  const selectedServiceDetails = services.find(service => service._id === selectedService);

  const handlePaymentSuccess = (details, data) => {
    if (!user || !user._id) {
      console.error('User is not logged in or user ID is missing');
      return;
    }

    const bookingData = {
      shopId,
      userId: user._id,
      service: selectedServiceDetails,
      bookingDate: new Date(selectedDate),
      bookingSlot: selectedTimeSlot,
      status: "confirmed",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    dispatch(saveBooking(bookingData)).then((bookingResponse) => {
      if (bookingResponse.payload && bookingResponse.payload._id) {
        const bookingId = bookingResponse.payload._id;

        const paymentData = {
          userId: user._id,
          bookingId,
          paymentMethod: "PayPal",
          totalAmount: selectedServiceDetails.price,
          discountApplied: 0,
          paymentStatus: "completed",
          createdAt: new Date(),
          updatedAt: new Date()
        };

        dispatch(savePayment(paymentData)).then((paymentResponse) => {
          setPaymentSuccess(true);
          setPaymentProcessing(false);
          
          // Redirect to the booking confirmation page
          navigate('/booking-confirmation', { 
            state: { 
              bookingDetails: bookingResponse.payload,
              paymentDetails: paymentResponse.payload,
              shopDetails: { name: "Barber's Den", address: "123 Main Street, Anytown, USA", contact: "+1 234 567 890" }
            } 
          });
        });
      } else {
        console.error('Failed to create booking');
        setPaymentProcessing(false);
      }
    }).catch(error => {
      console.error('Error saving booking:', error);
      setPaymentProcessing(false);
    });
  };

  const handleBookingConfirmation = () => {
    setPaymentProcessing(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-pink-500">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 p-6">
      {user ? (
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-pink-500">Book an Appointment</h1>
          
          {/* Services Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Select a Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <button
                  key={service._id}
                  className={`p-4 rounded-lg ${selectedService === service._id ? 'bg-pink-500' : 'bg-gray-800'} hover:bg-pink-400 transition-colors duration-200`}
                  onClick={() => setSelectedService(service._id)}
                >
                  <h3 className="font-semibold">{service.serviceName}</h3>
                  <p>Price: ${service.price}</p>
                  <p>Duration: {service.duration} minutes</p>
                </button>
              ))}
            </div>
          </section>

          {/* Date Selection */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Select a Date</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableDates.map((date) => (
                <button
                  key={date}
                  className={`p-4 rounded-lg ${selectedDate === date ? 'bg-pink-500' : 'bg-gray-800'} hover:bg-pink-400 transition-colors duration-200`}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTimeSlot(null);
                  }}
                >
                  <p>{new Date(date).toLocaleDateString()}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Time Slot Selection */}
          {selectedDate && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Select a Time Slot</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {availableTimeSlotsForDate.map((slot) => (
                  <button
                    key={slot._id}
                    className={`p-4 rounded-lg ${selectedTimeSlot === slot._id ? 'bg-pink-500' : 'bg-gray-800'} hover:bg-pink-400 transition-colors duration-200`}
                    onClick={() => setSelectedTimeSlot(slot._id)}
                  >
                    <p>{slot.startTime} - {slot.endTime}</p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Booking Summary */}
          <section className="mb-8 bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
            <div className="space-y-2">
              <p><strong>Service:</strong> {selectedServiceDetails ? `${selectedServiceDetails.serviceName} - $${selectedServiceDetails.price}` : 'Not selected'}</p>
              <p><strong>Date:</strong> {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Not selected'}</p>
              <p><strong>Time Slot:</strong> {selectedTimeSlot ? availableTimeSlotsForDate.find(slot => slot._id === selectedTimeSlot)?.startTime : 'Not selected'}</p>
              <p><strong>Total Cost:</strong> ${selectedServiceDetails ? selectedServiceDetails.price : 0}</p>
            </div>
          </section>

          {/* Confirm Booking and Payment */}
          {!paymentSuccess ? (
            <button
              className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-400 transition-colors duration-200"
              disabled={!selectedService || !selectedDate || !selectedTimeSlot || paymentProcessing}
              onClick={handleBookingConfirmation}
            >
              Confirm Booking
            </button>
          ) : (
            <div className="text-green-500">Payment successful! Booking confirmed.</div>
          )}

          {paymentProcessing && (
            <PayPalScriptProvider options={{ "client-id": "AX8vJHmoiXwxbyFjEcAO7SwZYs8VaIxpx7IoGcEqpjjamHAViHYBdCc9oPjgTQtyiCvjhPbZQgmRUkUP" }}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: selectedServiceDetails.price
                      }
                    }]
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(details => handlePaymentSuccess(details, data));
                }}
              />
            </PayPalScriptProvider>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl">Please log in to make a booking.</p>
        </div>
      )}
    </div>
  );
};

export default BookingPage;