const BookingModel = require('../models/booking');
const BookingRepository = require('../../domain/repositories/bookingRepository');

class BookingRepositoryImpl extends BookingRepository {
  async create(booking) {
    const bookingModel = new BookingModel(booking);
    return await bookingModel.save();
  }
}

module.exports = BookingRepositoryImpl;