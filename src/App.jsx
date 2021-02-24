import React, { useState } from "react";
import "./styles/styles.scss";
import Header from "./components/Header";
import Filters from "./components/Filters";
import Hotels from "./components/Hotels";

/* This app simulates the search for a hotel with the
option to apply different filters for the search, such
as check-in and check-out dates, countries, prices and sizes */

export default function App() {
  /* Default values for filters */
  const DefaultValues = {
    COUNTRIES: "Todos los países",
    PRICES: "Cualquier precio",
    SIZES: "Cualquier tamaño",
    DATEFROM: "",
    DATETO: ""
  };

  /* Controlled states */
  const [filters, setFilters] = useState({
    countries: DefaultValues.COUNTRIES,
    prices: DefaultValues.PRICES,
    sizes: DefaultValues.SIZES,
    dateFrom: DefaultValues.DATEFROM,
    dateTo: DefaultValues.DATETO
  });

  /* Different options for countries */
  const countryOptions = [
    { label: "Todos los países", value: "Todos los países" },
    { label: "Argentina", value: "Argentina" },
    { label: "Brasil", value: "Brasil" },
    { label: "Chile", value: "Chile" },
    { label: "Uruguay", value: "Uruguay" }
  ];

  /* Different options for prices */
  const priceOptions = [
    { label: "Cualquier precio", value: "Cualquier precio" },
    { label: "$", value: 1 },
    { label: "$$", value: 2 },
    { label: "$$$", value: 3 },
    { label: "$$$$", value: 4 }
  ];

  /* Different options for sizes */
  const sizeOptions = [
    { size: "any", label: "Cualquier tamaño", value: "Cualquier tamaño" },
    { size: "small", label: "Hotel pequeño", value: "pequeños" },
    { size: "medium", label: "Hotel mediano", value: "medianos" },
    { size: "big", label: "Hotel grande", value: "grandes" }
  ];

  /* Changes states values on input changes */
  const handleFiltersChange = (e) => {
    const { name, value } = e.target;
    let newFilters = { ...filters };
    Object.keys(filters).forEach((key) => {
      if (key === name) {
        newFilters[name] = value;
        setFilters(newFilters);
        if (name === "prices") {
          newFilters[name] = parseInt(value, 10);
          setFilters(newFilters);
        }
        if (name === "dateTo" && value < newFilters.dateFrom) {
          alert("La fecha de check-out debe ser mayor al check-in");
          newFilters[name] = DefaultValues.DATETO;
          setFilters(newFilters);
        }
      }
    });
  };

  /* Resets all states when click on reset btn */
  const handleFilterReset = () => {
    let newFilters = { ...filters };
    newFilters.countries = DefaultValues.COUNTRIES;
    newFilters.prices = DefaultValues.PRICES;
    newFilters.sizes = DefaultValues.SIZES;
    newFilters.dateFrom = DefaultValues.DATEFROM;
    newFilters.dateTo = DefaultValues.DATETO;
    setFilters(newFilters);
  };

  /* Creates a boolean variable that indicates if any filter is active  */
  const checkFiltersActive = (filters) => {
    let filtersActive = false;
    if (
      filters.countries !== DefaultValues.COUNTRIES ||
      filters.prices !== DefaultValues.PRICES ||
      filters.sizes !== DefaultValues.SIZES
    ) {
      filtersActive = true;
    }
    return filtersActive;
  };

  /* Sets a variable with different values according to different prices */
  const checkPriceCases = (cond, text) => {
    let price = text.DEFAULT;
    switch (cond) {
      case 1:
        price = text.PRICE1;
        break;
      case 2:
        price = text.PRICE2;
        break;
      case 3:
        price = text.PRICE3;
        break;
      case 4:
        price = text.PRICE4;
        break;
      default:
        break;
    }
    return price;
  };

  /* Messages to display in header for different price filters */
  const HeaderPriceMsg = {
    DEFAULT: "a cualquier precio",
    PRICE1: "muy económicos",
    PRICE2: "económicos",
    PRICE3: "caros",
    PRICE4: "de lujo"
  };

  /* Text to display in hotel cards for different prices  */
  const PriceIcon = {
    DEFAULT: "",
    PRICE1: "$",
    PRICE2: "$$",
    PRICE3: "$$$",
    PRICE4: "$$$$"
  };

  return (
    <div className="App">
      <Header
        from={filters.dateFrom}
        to={filters.dateTo}
        filterCountry={filters.countries}
        filterPrice={filters.prices}
        filterSize={filters.sizes}
        filtersActives={checkFiltersActive(filters)}
        checkPrice={checkPriceCases}
        priceMsg={HeaderPriceMsg}
        defaultValues={DefaultValues}
      />
      <Filters
        handleSelected={handleFiltersChange}
        country={filters.countries}
        price={filters.prices}
        size={filters.sizes}
        dateTo={filters.dateTo}
        dateFrom={filters.dateFrom}
        handleReset={handleFilterReset}
        countryOptions={countryOptions}
        priceOptions={priceOptions}
        sizeOptions={sizeOptions}
      />
      <Hotels
        filterCountry={filters.countries}
        filterPrice={filters.prices}
        filterSize={filters.sizes}
        filterDateFrom={filters.dateFrom}
        filterDateTo={filters.dateTo}
        filtersActives={checkFiltersActive(filters)}
        defaultValues={DefaultValues}
        sizeOptions={sizeOptions}
        checkPrice={checkPriceCases}
        priceIcon={PriceIcon}
      />
    </div>
  );
}
