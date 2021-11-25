import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';



export default function map() {
    
    const position = [55.676098, 12.568337]
    return (
    
            <MapContainer center={position} zoom={10} scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a
                    href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                <Marker position={position}></Marker>
            </MapContainer>

        
    );

}