const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/BookingController');
const CreateBookingUseCase = require('../../application/use-case/payment/CreateBookingUseCase');
const BookingRepositoryImpl = require('../../infrastructure/db/BookingRepositoryImpl');

const bookingRepository = new BookingRepositoryImpl();
const createBookingUseCase = new CreateBookingUseCase(bookingRepository);
const bookingController = new BookingController(createBookingUseCase);

router.post('/create', async (req, res, next) => {
  try {
    await bookingController.createBooking(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;