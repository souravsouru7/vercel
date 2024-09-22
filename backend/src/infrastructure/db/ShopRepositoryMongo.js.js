const ShopRepository = require('../../domain/repositories/ShopRepository'); // Import the interface
const ShopModel = require('../models/ShopModel');

class ShopRepositoryMongo extends ShopRepository {
  async createShop(shopData) {
    const newShop = new ShopModel(shopData);
    return await newShop.save();
  }

  async findByOwnerId(ownerId) {
    return await ShopModel.findOne({ ownerId });
  }

  async findById(id) {
    return await ShopModel.findById(id);
  }

  async updateShop(id, shopData) {
    console.log("Updating Shop ID:", id, "with Data:", shopData);
    return await ShopModel.findByIdAndUpdate(id, shopData, { new: true });
  }
  async getAllShops() {
    try {
    
      return await ShopModel.find({});
    } catch (error) {
      throw new Error('Error fetching shops from database');
    }
  }
  async searchByAddress(query) {
    try {
      console.log('Searching in database with query:', query); // Add this log
      return await ShopModel.find({ address: { $regex: query, $options: 'i' } });
    } catch (error) {
      console.error('Error in searchByAddress:', error); // Add this log
      throw new Error('Error searching shops by address');
    }
  }
  async getServicesByShopId(shopId) {
    try {
      const shop = await ShopModel.findById(shopId).select('services');
      if (!shop) {
        throw new Error('Shop not found');
      }
      return shop.services;
    } catch (error) {
      throw new Error(`Error retrieving services: ${error.message}`);
    }
  }

  async updateService(shopId, serviceId, updatedService) {
    const shop = await ShopModel.findById(shopId);
    const serviceIndex = shop.services.findIndex(service => service._id.toString() === serviceId);
    if (serviceIndex !== -1) {
      shop.services[serviceIndex] = { ...shop.services[serviceIndex], ...updatedService };
      return await shop.save();
    }
    throw new Error('Service not found');
  }

  async deleteService(shopId, serviceId) {
    const shop = await ShopModel.findById(shopId);
    const serviceIndex = shop.services.findIndex(service => service._id.toString() === serviceId);
    if (serviceIndex !== -1) {
      shop.services.splice(serviceIndex, 1);
      return await shop.save();
    }
    throw new Error('Service not found');
  }
  async addTimeSlot(shopId, date, startTime, endTime) {
    const shop = await ShopModel.findById(shopId);
    if (!shop) {
      throw new Error('Shop not found');
    }
    
    shop.availableSlots.push({ date, startTime, endTime });
    return await shop.save();
  }
  async getTimeSlots(shopId) {
    const shop = await ShopModel.findById(shopId).select('availableSlots');
    if (!shop) {
      throw new Error('Shop not found');
    }
    return shop.availableSlots;
  }
  async updateTimeSlot(shopId, timeSlotId, updatedTimeSlot) {
    const shop = await ShopModel.findById(shopId);
    if (!shop) {
      throw new Error('Shop not found');
    }
  
    const slotIndex = shop.availableSlots.findIndex(slot => slot._id.toString() === timeSlotId);
    if (slotIndex === -1) {
      throw new Error('Time slot not found');
    }
  
    // Update the time slot
    shop.availableSlots[slotIndex] = { ...shop.availableSlots[slotIndex], ...updatedTimeSlot };
    return await shop.save();
  }
  async deleteTimeSlot(shopId, timeSlotId) {
    const shop = await ShopModel.findById(shopId);
    if (!shop) {
      throw new Error('Shop not found');
    }
  
    const slotIndex = shop.availableSlots.findIndex(slot => slot._id.toString() === timeSlotId);
    if (slotIndex !== -1) {
      shop.availableSlots.splice(slotIndex, 1);
      return await shop.save();
    }
  
    throw new Error('Time slot not found');
  }
  
  
  
}

module.exports = ShopRepositoryMongo;
