// src/modules/bikes/public/pages/BikeListPage.jsx
import React from 'react';
import {AllBikesView} from '@/modules/bikes';

const BikeListPage = ({ isAppReady }) => {
  return <AllBikesView isAppReady={isAppReady} />;
};

export default BikeListPage;
