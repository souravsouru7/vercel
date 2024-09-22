class AddTimeSlot {
    constructor(shopRepository) {
      this.shopRepository = shopRepository;
    }
  
    async execute(shopId, date, startTime, endTime) {
      return await this.shopRepository.addTimeSlot(shopId, date, startTime, endTime);
    }
  }
  
  module.exports = AddTimeSlot;
  