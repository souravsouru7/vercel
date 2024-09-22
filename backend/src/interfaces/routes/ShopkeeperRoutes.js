// backend/src/interfaces/routes/ShopkeeperRoutes.js
const express = require('express');
const router = express.Router();

// Inject dependencies
const ShopkeeperRepositoryMongo = require('../../infrastructure/db/ShopkeeperRepositoryMongo');
const RegisterShopkeeper = require('../../application/use-case/shopkeeper/RegisterShopkeeper');
const LoginShopkeeper = require('../../application/use-case/shopkeeper/LoginShopkeeperUseCase');
const GetShopkeeperById = require('../../application/use-case/shopkeeper/GetShopkeeperById');
const HashService = require('../../application/services/HashService');
const TokenService = require('../../application/services/TokenService');
const ShopkeeperController = require('../controllers/ShopkeeperController');

const shopkeeperRepository = new ShopkeeperRepositoryMongo();
const hashService = new HashService();
const tokenService = new TokenService();
const registerShopkeeperUseCase = new RegisterShopkeeper(shopkeeperRepository, hashService);
const loginShopkeeperUseCase = new LoginShopkeeper(shopkeeperRepository, hashService, tokenService);
const getShopkeeperByIdUseCase = new GetShopkeeperById(shopkeeperRepository);
const shopkeeperController = new ShopkeeperController(registerShopkeeperUseCase, loginShopkeeperUseCase, getShopkeeperByIdUseCase);

router.post('/register', (req, res) => shopkeeperController.register(req, res));
router.post('/login', (req, res) => shopkeeperController.login(req, res));
router.get('/:id', (req, res) => shopkeeperController.getShopkeeperById(req, res));

module.exports = router;
