import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ChangeView from './ChangeView';



export default function map({ center, zoom }) {
    return (
    
        <div className="map">
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
                <ChangeView center={center} zoom={zoom} />
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