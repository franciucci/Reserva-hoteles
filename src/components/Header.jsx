import React from "react";
import moment from "moment";
import "moment/locale/es";
import ActiveFilters from "./ActiveFilters";
moment.locale("es");

/* This component renders the header of the page specifying
search filters*/

function Header(props) {
  const {
    from,
    to,
    filterCountry,
    filterPrice,
    filterSize,
    filtersActives,
    checkPrice,
    priceMsg,
    defaultValues
  } = props;

  return (
    <header className="header">
      <h1 className="header__title">Reserva de Hoteles</h1>

      <ActiveFilters
        prices={filterPrice}
        size={filterSize}
        country={filterCountry}
        checkIn={from}
        checkOut={to}
        filtersActives={filtersActives}
        checkPrice={checkPrice}
        headerPriceMsg={priceMsg}
        defaultValues={defaultValues}
      />
    </header>
  );
}

export default Header;
