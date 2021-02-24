import React from "react";
import ResetFilters from "./ResetFilters";
import moment from "moment";
/* This component renders the filters' section of the page, 
where the user can filter his/her search */

function Filters(props) {
  const {
    handleSelected,
    handleReset,
    country,
    price,
    size,
    dateTo,
    dateFrom,
    countryOptions,
    priceOptions,
    sizeOptions
  } = props;

  let now = moment().format("YYYY-MM-DD");
  return (
    <section className="filters">
      <input
        type="date"
        name="dateFrom"
        onChange={handleSelected}
        className="filters__dateFrom"
        value={dateFrom}
        min={now}
      />
      <input
        type="date"
        name="dateTo"
        onChange={handleSelected}
        className="filters__dateTo"
        value={dateTo}
      />
      <select
        id="filters__countries"
        name="countries"
        onChange={handleSelected}
        value={country}
        className="filters__countries"
      >
        {countryOptions.map((option) => {
          return (
            <option value={option.value} key={option.label}>
              {option.label}
            </option>
          );
        })}
      </select>
      <select
        id="filters__prices"
        value={price}
        onChange={handleSelected}
        name="prices"
        className="filters__prices"
      >
        {priceOptions.map((option) => {
          return (
            <option value={option.value} key={option.label}>
              {option.label}
            </option>
          );
        })}
      </select>
      <select
        id="filters__sizes"
        onChange={handleSelected}
        name="sizes"
        className="filters__sizes"
        value={size}
      >
        {sizeOptions.map((option) => {
          return (
            <option value={option.value} key={option.label}>
              {option.label}
            </option>
          );
        })}
      </select>
      <ResetFilters handleReset={handleReset} />
    </section>
  );
}

export default Filters;
