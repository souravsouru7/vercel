import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { fetchShopDetails } from '../../redux/slices/shopSlice'; // Import the thunk

function Dashboard() {
  const dispatch = useDispatch();
  const { shopkeeper, token } = useSelector((state) => state.shopkeeper); 
  const { shop } = useSelector((state) => state.shop); 

  useEffect(() => {
    if (shopkeeper?.id && token) {
      // Fetch shop details if shopkeeper is logged in
      dispatch(fetchShopDetails({ ownerId: shopkeeper.id, token }));
    }
  }, [dispatch, shopkeeper, token]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar shop={shop} /> {/* Pass the shop data to Sidebar */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main
          className="flex-1 overflow-x-hidden overflow-y-auto"
          style={{
            marginLeft: '-5px',
            marginTop: '0px',
            width: '1500px',
          }}
        >
          {/* Ensure shopId is passed to the child components like TimeSlotManagement */}
          <Outlet context={{ shopId: shop?._id }} />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
