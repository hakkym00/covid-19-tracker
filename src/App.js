import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./component/InfoBox";
import Map from "./component/Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  useEffect(() => {
    const getCountriesData = async () => {
      const { data } = await Axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      const _countries = data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      setCountries(_countries);
    };
    getCountriesData();
  }, []);
  const onChangeCountry = async (e) => {
    setCountry(e.target.value);
  };
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h2>COVID 19 Tracker</h2>
          <FormControl className="app__container">
            <Select
              variant="outlined"
              value={country}
              onChange={onChangeCountry}
            >
              <MenuItem value="worldwide"> Worldwide </MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}> {country.name} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={950} totals={2000} />
          <InfoBox title="Recovered" cases={180} totals={9000} />
          <InfoBox title="Deaths" cases={350} totals={5000} />
        </div>
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h4>Live Cases by Country</h4>
          <h4>Worldwide new cases</h4>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
