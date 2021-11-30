import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ChangeView from './ChangeView';
import CovidApi from '../api/Covid19API';


export default function map({ country }) {

    let center = CovidApi.Coordinates(country);

    return (
    
        <div className="map">
            <MapContainer center={center} zoom={1} scrollWheelZoom={false}>
                <ChangeView center={center} zoom={1} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a
                    href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                <Marker position={center}></Marker>
            </MapContainer>
        </div>
    );

}