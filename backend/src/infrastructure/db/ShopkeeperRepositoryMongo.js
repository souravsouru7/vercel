// backend/src/infrastructure/db/ShopkeeperRepositoryMongo.js
const ShopkeeperModel = require('../models/ShopkeeperModel');
const ShopkeeperRepository = require('../../domain/repositories/ShopkeeperRepository');

class ShopkeeperRepositoryMongo extends ShopkeeperRepository {
  async createShopkeeper(shopkeeper) {
    const newShopkeeper = new ShopkeeperModel(shopkeeper);
    return await newShopkeeper.save();
  }

  async findByEmail(email) {
    return await ShopkeeperModel.findOne({ email });
  }
  async findById(id) {
    return await ShopkeeperModel.findById(id);
  }
}

module.exports = ShopkeeperRepositoryMongo;
