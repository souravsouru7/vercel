import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addServices,
  resetStatus,
  fetchShopDetails,
  fetchServices,
  updateService,
  deleteService,
} from "../../redux/slices/shopSlice";

const ServiceManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceDuration, setServiceDuration] = useState("");
  const [editingService, setEditingService] = useState(null);

  const dispatch = useDispatch();

  const { shopkeeper } = useSelector((state) => state.shopkeeper);
  const { shop, loading, success, error, services } = useSelector(
    (state) => state.shop
  );

  useEffect(() => {
    if (shopkeeper?.id && !shop) {
      dispatch(
        fetchShopDetails({ ownerId: shopkeeper.id, token: shopkeeper.token })
      );
    }
  }, [shopkeeper, shop, dispatch]);

  useEffect(() => {
    if (shop?._id) {
      dispatch(fetchServices(shop._id));
    }
  }, [shop, dispatch]);

  useEffect(() => {
    if (success) {
      setServiceName("");
      setServiceDescription("");
      setServicePrice("");
      setServiceDuration("");
      setEditingService(null);
      setShowModal(false);
      dispatch(resetStatus());
      dispatch(fetchServices(shop._id));
    }
  }, [success, dispatch, shop]);

  const openServiceForm = () => {
    setEditingService(null);
    setShowModal(true);
  };

  const closeServiceForm = () => {
    setShowModal(false);
    setEditingService(null);
    setServiceName("");
    setServiceDescription("");
    setServicePrice("");
    setServiceDuration("");
  };

  const handleAddOrUpdateService = (e) => {
    e.preventDefault();
    if (serviceName && servicePrice && serviceDuration) {
      const serviceData = {
        serviceName,
        description: serviceDescription,
        price: parseFloat(servicePrice),
        duration: serviceDuration,
      };

      if (editingService) {
        dispatch(updateService({
          shopId: shop._id,
          serviceId: editingService._id,
          serviceData,
        }));
      } else {
        dispatch(addServices([serviceData]));
      }
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceName(service.serviceName);
    setServiceDescription(service.description || "");
    setServicePrice(service.price.toString());
    setServiceDuration(service.duration.toString());
    setShowModal(true);
  };

  const handleDeleteService = (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      dispatch(deleteService({ shopId: shop._id, serviceId }))
        .then(() => dispatch(fetchServices(shop._id)));
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (!shop) return <div className="text-white">Please add a shop first.</div>;

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-grow flex flex-col bg-gray-900 text-white">
        <header className="flex justify-between items-center bg-gray-800 p-4">
          <div className="text-2xl text-red-500">Manage Services</div>
          <div className="flex items-center space-x-4">
            <img src="avatar.png" alt="User Avatar" className="w-10 h-10 rounded-full" />
            <span className="text-white cursor-pointer relative">
              {shopkeeper?.name || "Shop Owner"}
            </span>
          </div>
        </header>

        <div className="p-6">
          <div className="mb-6">
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={openServiceForm}>
              Add New Service
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl mb-4">Services Offered</h2>
            <table className="min-w-full table-auto text-left border border-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2">Service Name</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Duration</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-700">
                {services && services.map((service) => (
                  <tr key={service._id} className="hover:bg-gray-600">
                    <td className="px-4 py-2">{service.serviceName}</td>
                    <td className="px-4 py-2">{service.description || "N/A"}</td>
                    <td className="px-4 py-2">${service.price.toFixed(2)}</td>
                    <td className="px-4 py-2">{service.duration}</td>
                    <td className="px-4 py-2">
                      <button className="bg-gray-600 hover:bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleEditService(service)}>Edit</button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded ml-2" onClick={() => handleDeleteService(service._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
              <span className="absolute top-4 right-4 text-2xl text-white cursor-pointer" onClick={closeServiceForm}>&times;</span>
              <h2 className="text-2xl mb-4">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
              <form onSubmit={handleAddOrUpdateService}>
                <div className="mb-4">
                  <label htmlFor="service-name" className="block text-white">Service Name:</label>
                  <input
                    type="text"
                    id="service-name"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full p-2 bg-gray-800 text-white rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-white">Description:</label>
                  <textarea
                    id="description"
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                    rows="4"
                    className="w-full p-2 bg-gray-800 text-white rounded"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className="block text-white">Price:</label>
                  <input
                    type="number"
                    id="price"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                    className="w-full p-2 bg-gray-800 text-white rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="duration" className="block text-white">Duration:</label>
                  <input
                    type="text"
                    id="duration"
                    value={serviceDuration}
                    onChange={(e) => setServiceDuration(e.target.value)}
                    className="w-full p-2 bg-gray-800 text-white rounded"
                    required
                  />
                </div>
                <div className="text-right">
                  <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                    {editingService ? 'Save Changes' : 'Add Service'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <footer className="bg-gray-800 text-center py-4 mt-auto text-gray-400">
          © 2024 ShopKeeper. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default ServiceManagement;