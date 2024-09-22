class BookingController {
    constructor(createBookingUseCase) {
      this.createBookingUseCase = createBookingUseCase;
    }
  
    async createBooking(req, res) {
      try {
        const booking = await this.createBookingUseCase.execute(req.body);
        res.status(201).json(booking);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  module.exports =BookingController;