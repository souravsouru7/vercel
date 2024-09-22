// Import necessary modules
const express = require('express');
const multer = require('multer');
const router = express.Router();

// Importing required classes and services
const ShopRepositoryMongo = require('../../infrastructure/db/ShopRepositoryMongo.js'); 
const CreateShop = require('../../application/use-case/shopkeeper/shop/CreateShop');
const UpdateShop = require('../../application/use-case/shopkeeper/shop/UpdateShop'); // Use Case for updating a shop
const CloudinaryService = require('../../infrastructure/external-services/CloudinaryService'); // Cloudinary Service for image uploads
const GetAllShops = require('../../application/use-case/shopkeeper/shopuser/GetAllShops'); // Use Case for getting all shops
const SearchShopsByAddress = require('../../application/use-case/shopkeeper/shopuser/SearchShopsByAddress'); // Use Case for searching shops by address
const ShopController = require('../controllers/ShopController'); // Shop Controller
const AddServices = require('../../application/use-case/shopkeeper/shop/AddServices.js');
const UpdateService = require('../../application/use-case/shopkeeper/shop/updateServiceUseCase.js');
const DeleteService = require('../../application/use-case/shopkeeper/shop/deleteServiceUseCase');
const AddTimeSlot = require('../../application/use-case/shopkeeper/shop/timeslot/AddTimeSlot.js');
const GetTimeSlots = require('../../application/use-case/shopkeeper/shop/timeslot/GetTimeSlots.js');
const UpdateTimeSlot = require('../../application/use-case/shopkeeper/shop/timeslot/UpdateTimeSlot.js');
const DeleteTimeSlot = require('../../application/use-case/shopkeeper/shop/timeslot/DeleteTimeSlot.js');
const GetShopById = require('../../application/use-case/shopkeeper/shopuser/GetShopById.js');
const upload = multer({ dest: 'uploads/' });

// Initialize repositories and services
const shopRepository = new ShopRepositoryMongo(); // MongoDB Repository for shop
const cloudinaryService = new CloudinaryService(); // Cloudinary Service for handling image uploads

// Initialize use cases

const getAllShopsUseCase = new GetAllShops(shopRepository); // Get all shops for user
const createShopUseCase = new CreateShop(shopRepository, cloudinaryService); // Create Shop Use Case
const updateShopUseCase = new UpdateShop(shopRepository, cloudinaryService); // Update Shop Use Case
const searchShopsByAddressUseCase = new SearchShopsByAddress(shopRepository);
const updateServiceUseCase = new UpdateService(shopRepository);
const deleteServiceUseCase = new DeleteService(shopRepository); // Search Shops by Address Use Case
const addServicesUseCase = new AddServices(shopRepository);
const addTimeSlotUseCase = new AddTimeSlot(shopRepository);
const getTimeSlotsUseCase = new GetTimeSlots(shopRepository);
const updateTimeSlotUseCase = new UpdateTimeSlot(shopRepository);
const deleteTimeSlotUseCase = new DeleteTimeSlot(shopRepository);
const getShopByIdUseCase = new GetShopById(shopRepository);
const shopController = new ShopController(
  createShopUseCase, 
  updateShopUseCase, 
  cloudinaryService, 
  shopRepository, 
  getAllShopsUseCase,
  searchShopsByAddressUseCase,
  addServicesUseCase,
  updateServiceUseCase,
  deleteServiceUseCase,
  addTimeSlotUseCase,
  getTimeSlotsUseCase, 
  updateTimeSlotUseCase,
  deleteTimeSlotUseCase,
  getShopByIdUseCase
);


router.get('/', (req, res) => shopController.getAllShops(req, res));
router.get('/details/:shopId', (req, res) => shopController.getShopById(req, res));


router.get('/search', (req, res) => shopController.searchShopsByAddress(req, res));

router.post('/services/:id', (req, res) => shopController.addServices(req, res));
router.get('/services/:id', (req, res) => shopController.getServices(req, res));
router.put('/services/:id/:serviceId', (req, res) => shopController.updateService(req, res));
router.delete('/services/:id/:serviceId', (req, res) => shopController.deleteService(req, res));
// Define the route for adding time slots
router.post('/time-slot/:shopId', shopController.addTimeSlot.bind(shopController));
router.get('/time-slot/:shopId', (req, res) => shopController.getTimeSlots(req, res));


router.put('/time-slot/:shopId/:slotId', (req, res) => shopController.updateTimeSlot(req, res));

router.delete('/time-slot/:shopId/:slotId', (req, res) => shopController.deleteTimeSlot(req, res));
router.post(
  '/add',
  upload.fields([{ name: 'shopImage' },{ name: 'licenseImage' }]), 
  (req, res) => shopController.createShop(req, res)
);


router.put(
  '/update/:id',
  upload.fields([{ name: 'shopImage' }, { name: 'licenseImage' }]), // Handles multiple file uploads
  (req, res) => shopController.updateShop(req, res)
);

// Route to fetch a shop by the owner ID
router.get('/:ownerId', (req, res) => shopController.getShopByOwnerId(req, res));

module.exports = router;
