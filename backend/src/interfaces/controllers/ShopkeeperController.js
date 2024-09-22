// backend/src/interfaces/controllers/ShopkeeperController.js
class ShopkeeperController {
    constructor(registerShopkeeperUseCase, loginShopkeeperUseCase, getShopkeeperByIdUseCase) {
      this.registerShopkeeperUseCase = registerShopkeeperUseCase;
      this.loginShopkeeperUseCase = loginShopkeeperUseCase;
      this.getShopkeeperByIdUseCase = getShopkeeperByIdUseCase;
    }
  
    async register(req, res) {
      try {
        const { name, email, password, contactNumber } = req.body;
        const result = await this.registerShopkeeperUseCase.execute({ name, email, password, contactNumber });
        return res.status(201).json({ success: true, shopkeeper: result });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    }
  
    async login(req, res) {
      try {
        const { email, password } = req.body;
        const result = await this.loginShopkeeperUseCase.execute({ email, password });
        return res.status(200).json({ success: true, token: result.token, shopkeeper: result.shopkeeper });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    }
  
    async getShopkeeperById(req, res) {
      try {
        const { id } = req.params;
        const result = await this.getShopkeeperByIdUseCase.execute(id);
        if (result) {
          return res.status(200).json({ success: true, shopkeeper: result });
        } else {
          return res.status(404).json({ success: false, message: 'Shopkeeper not found' });
        }
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    }
  }
  
  module.exports = ShopkeeperController;
  