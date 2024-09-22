import React from "react";
import { Routes, Route } from "react-router-dom";
import MapsList from "../pages/MapsList";
import MapDetails from "../pages/MapDetails";
import NewMap from "../pages/NewMap";
import NotFound from "./NotFound";
import Map from "../pages/Map";
// import MyComponent from './MyComponent';

import { LoadScript } from "@react-google-maps/api";
export default function MapRoutes() {
  
  const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  // const key='AIzaSyDCgN11PkqVobC_yI73WtRJpuZOT9Pig9A';
  return (
    <div>
      <Routes>
        <Route index element={<MapsList />} />
        <Route path=":id" element={<MapDetails />} />
        <Route path="new" element={<NewMap />} />
        <Route
          path="test"
          element={
            <LoadScript googleMapsApiKey={key}>
              <Map />
            </LoadScript>
          }
        />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}
