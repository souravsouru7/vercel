import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
  fetchTimeSlots,
  resetStatus,
} from "../../redux/slices/shopSlice";

const TimeSlotManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [editingSlot, setEditingSlot] = useState(null);

  const dispatch = useDispatch();

  const { shopkeeper } = useSelector((state) => state.shopkeeper);
  const { shop, loading, success, error, timeSlots } = useSelector(
    (state) => state.shop
  );

  const fetchData = useCallback(() => {
    if (shop?._id) {
      console.log('Fetching time slots for shop:', shop._id);
      dispatch(fetchTimeSlots(shop._id));
    } else {
      console.log('Shop ID not available');
    }
  }, [shop, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (success) {
      setStartTime("");
      setEndTime("");
      setEditingSlot(null);
      setShowModal(false);
      dispatch(resetStatus());
      fetchData(); // Refetch data after successful operation
    }
  }, [success, dispatch, fetchData]);

  const openTimeSlotForm = () => {
    setEditingSlot(null);
    setStartTime("");
    setEndTime("");
    setShowModal(true);
  };

  const closeTimeSlotForm = () => {
    setShowModal(false);
    setEditingSlot(null);
    setStartTime("");
    setEndTime("");
  };

  const handleAddOrUpdateTimeSlot = (e) => {
    e.preventDefault();
    if (startTime && endTime) {
      const timeSlotData = {
        startTime,
        endTime,
      };

      if (editingSlot) {
        dispatch(updateTimeSlot({
          shopId: shop._id,
          slotId: editingSlot._id,
          ...timeSlotData,
        }));
      } else {
        dispatch(addTimeSlot({
          shopId: shop._id,
          ...timeSlotData,
        }));
      }
    }
  };

  const handleEditTimeSlot = (slot) => {
    setEditingSlot(slot);
    setStartTime(slot.startTime);
    setEndTime(slot.endTime);
    setShowModal(true);
  };

  const handleDeleteTimeSlot = (slotId) => {
    if (window.confirm("Are you sure you want to delete this time slot?")) {
      dispatch(deleteTimeSlot({ shopId: shop._id, slotId }));
    }
  };

  if (loading) return <div className="text-white">Loading time slots...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;
  if (!shop) return <div className="text-white">Please add a shop first.</div>;

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-grow flex flex-col bg-gray-900 text-white">
        <header className="flex justify-between items-center bg-gray-800 p-4">
          <div className="text-2xl text-red-500">Manage Time Slots</div>
          <div className="flex items-center space-x-4">
            <img src="avatar.png" alt="User Avatar" className="w-10 h-10 rounded-full" />
            <span className="text-white cursor-pointer relative">
              {shopkeeper?.name || "Shop Owner"}
            </span>
          </div>
        </header>

        <div className="p-6">
          <div className="mb-6">
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={openTimeSlotForm}>
              Add New Time Slot
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl mb-4">Available Time Slots</h2>
            {timeSlots.length === 0 ? (
              <p>No time slots available. Add some!</p>
            ) : (
              <table className="min-w-full table-auto text-left border border-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-2">Start Time</th>
                    <th className="px-4 py-2">End Time</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-700">
                  {timeSlots.map((slot) => (
                    <tr key={slot._id} className="hover:bg-gray-600">
                      <td className="px-4 py-2">{slot.startTime}</td>
                      <td className="px-4 py-2">{slot.endTime}</td>
                      <td className="px-4 py-2">
                        <button className="bg-gray-600 hover:bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleEditTimeSlot(slot)}>Edit</button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded ml-2" onClick={() => handleDeleteTimeSlot(slot._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
              <span className="absolute top-4 right-4 text-2xl text-white cursor-pointer" onClick={closeTimeSlotForm}>&times;</span>
              <h2 className="text-2xl mb-4">{editingSlot ? 'Edit Time Slot' : 'Add New Time Slot'}</h2>
              <form onSubmit={handleAddOrUpdateTimeSlot}>
                <div className="mb-4">
                  <label htmlFor="start-time" className="block text-white">Start Time:</label>
                  <input
                    type="time"
                    id="start-time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-2 bg-gray-800 text-white rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="end-time" className="block text-white">End Time:</label>
                  <input
                    type="time"
                    id="end-time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-2 bg-gray-800 text-white rounded"
                    required
                  />
                </div>
                <div className="text-right">
                  <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                    {editingSlot ? 'Save Changes' : 'Add Time Slot'}
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

export default TimeSlotManagement;