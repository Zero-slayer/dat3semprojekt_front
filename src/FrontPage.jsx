import React from 'react';
import NavigationBar from './components/NavigationBar'
import './FrontPage.css';
import covidApi from './api/Covid19API';
import Map from './components/LeafletMap';


export default function FrontPage() {

    const countries = covidApi.Countries();
    const renderCountries = [];

    for (let country of countries) {
        renderCountries.push(<option key={country}>{country}</option>)
    }

    return (
        
        <div>
            <NavigationBar/>        
            <h1 id="header">Worldwide COVID-19 cases</h1>

            <form>
                <div className="container" id="box1">
                    <div className="mb-3">
                        <label htmlFor="countryTextInput" className="form-label">Country: </label>
                        <select id="countryTextInput" className="form-select">
                            <option defaultValue>Country</option>
                            {renderCountries}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="filterTextInput" className="form-label">Filter:</label>
                        <select id="filterTextInput" className="form-select">
                            <option defaultValue>Filter</option>
                            <option value="1">Confirmed cases</option>
                            <option value="2">Recovered cases</option>
                            <option value="3">Active cases</option>
                            <option value="4">Deaths</option>
                        </select>
                    </div>
                </div>

                <div className="container" id="box2">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>

                <div id="leafletMap">
                    <Map />
                </div>

            </form>
        </div>

    )

};