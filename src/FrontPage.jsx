import React from 'react';
import './FrontPage.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function FrontPage() {

    return (
        
        <div>
            
            <h1 id="header">Worldwide COVID-19 cases</h1>

            <form>
                <div class="container" id="box1">
                    <div class="mb-3">
                        <label for="countryTextInput" class="form-label">Country: </label>
                        <select id="countryTextInput" class="form-select">
                            <option>Country</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="filterTextInput" class="form-label">Filter:</label>
                        <select id="filterTextInput" class="form-select">
                            <option selected>Filter</option>
                            <option value="1">Confirmed cases</option>
                            <option value="2">Recovered cases</option>
                            <option value="3">Active cases</option>
                            <option value="4">Deaths</option>
                        </select>
                    </div>
                </div>

                <div class="container" id="box2">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>

            </form>

            <MapContainer center={[45.4, -75.7]} zoom={12}scrollWheelZoom={false}>
      <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>

            

        </div>

    )

};