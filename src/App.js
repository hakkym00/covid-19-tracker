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
import Table from "./component/Table";
import { sortData } from "./util";
import LineGraph from "./component/LineGraph";
import Maps from "./component/Maps";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTabelData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  useEffect(() => {
    const getCountriesData = async () => {
      const { data } = await Axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      const _countries = data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      const sortedData = sortData(data);
      setTabelData(sortedData);
      setCountries(_countries);
      setMapCountries(data);
    };
    getCountriesData();
  }, [mapCenter]);

  useEffect(() => {
    async function fetchWorldwide() {
      const { data } = await Axios.get("https://disease.sh/v3/covid-19/all");
      setCountryInfo(data);
    }
    fetchWorldwide();
  }, [mapCenter]);

  const onChangeCountry = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    const { data } = await Axios.get(url);
    setCountryInfo(data);
    if (countryCode === "worldwide") {
      setMapCenter([34.80746, -40.4796]);
    } else {
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    }
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
                <MenuItem key={country.name} value={country.value}>
                  {" "}
                  {country.name}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Cases"
            cases={countryInfo.todayCases}
            totals={countryInfo.cases}
          />
          <InfoBox
            isRecovered
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={countryInfo.todayRecovered}
            totals={countryInfo.recovered}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={countryInfo.todayDeaths}
            totals={countryInfo.deaths}
          />
        </div>
        <Maps
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h4>Live Cases by Country</h4>
          <Table countries={tableData} />
          <br />
          <h4>Worldwide new {casesType} </h4>
          <br />
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
