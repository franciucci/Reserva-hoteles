import React from "react";
import moment from "moment";

/* This component renders the filters actives for the search */

function ActiveFilters(props) {
  const {
    prices,
    size,
    country,
    checkIn,
    checkOut,
    filtersActives,
    checkPrice,
    headerPriceMsg,
    defaultValues
  } = props;

  /* Format date to display when check-in and check-out dates
  are selected */
  let format = "dddd D MMMM YYYY";
  let startDate = "";
  let endDate = "";
  if (checkIn && checkOut && checkOut >= checkIn) {
    startDate = moment(checkIn).format(format);
    endDate = moment(checkOut).format(format);
  }

  /* Sets different texts to display the price filters actives */
  let price = checkPrice(prices, headerPriceMsg);

  /* Sets the default text to display for the size filter */
  let hotelSize = size;
  if (hotelSize === defaultValues.SIZES) {
    hotelSize = "de cualquier tamaño";
  }

  /* Sets the default text to display for the country filter */
  let hotelCountry = country;
  if (hotelCountry === defaultValues.COUNTRIES) {
    hotelCountry = "todos los países";
  }

  return (
    <p className="header__text">
      {filtersActives && (
        <span>
          Hoteles {price} {hotelSize} en {hotelCountry}
        </span>
      )}
      {startDate && (
        <span>
          {" "}
          desde el <b>{startDate}</b> hasta el <b>{endDate}</b>
        </span>
      )}
    </p>
  );
}

export default ActiveFilters;
