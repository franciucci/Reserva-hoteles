import React from "react";
import { hotelsData } from "../assets/scripts/data";
import HotelCard from "./HotelCard";
import moment from "moment";

/* This component renders the main section of the page with 
the hotel list. It takes the hotels' information from hotelsData and
throug a .map of the array passes it throug a prop for 
HotelCard component, that will render each single hotel card. */

function Hoteles(props) {
  const {
    filterCountry,
    filterPrice,
    filterSize,
    filterDateFrom,
    filterDateTo,
    filtersActives,
    defaultValues,
    sizeOptions,
    checkPrice,
    priceIcon
  } = props;

  let hotels = hotelsData;

  /* Filters hotels by countries */
  if (filterCountry !== defaultValues.COUNTRIES) {
    hotels = hotels.filter((hotel) => filterCountry === hotel.country);
  }

  /* Filters hotels  by prices */
  if (filterPrice !== defaultValues.PRICES) {
    hotels = hotels.filter(
      (hotel) => parseInt(filterPrice, 10) === hotel.price
    );
  }

  /* Return the index of and object inside an array by its attribute */
  const findWithAttr = (array, attr, value) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i][attr] === value) {
        return i;
      }
    }
  };

  /* Filters hotels by rooms */
  if (filterSize !== defaultValues.SIZES) {
    if (
      filterSize ===
      sizeOptions[findWithAttr(sizeOptions, "size", "small")].value
    ) {
      hotels = hotels.filter((hotel) => hotel.rooms <= 10);
    } else {
      if (
        filterSize ===
        sizeOptions[findWithAttr(sizeOptions, "size", "medium")].value
      ) {
        hotels = hotels.filter(
          (hotel) => hotel.rooms > 10 && hotel.rooms <= 20
        );
      } else {
        if (
          filterSize ===
          sizeOptions[findWithAttr(sizeOptions, "size", "big")].value
        ) {
          hotels = hotels.filter((hotel) => hotel.rooms > 20);
        }
      }
    }
  }

  /* Filters hotels by check-in and check-out */
  if (filterDateFrom && filterDateTo) {
    if (filterDateTo >= filterDateFrom) {
      let format = "YYYY-MM-DD";
      let startDate = moment(filterDateFrom).format(format);
      let endDate = moment(filterDateTo).format(format);
      hotels = hotels.filter(
        (hotel) =>
          startDate >= moment(hotel.availabilityFrom).format(format) &&
          endDate <= moment(hotel.availabilityTo).format(format)
      );
    }
  }

  /* Creates a boolean variable that indicates if results are found 
  or not when a filter is active */
  const checkResults = (hotels) => {
    let searchResults = false;
    let filterIsActive = filtersActives;
    if (filterIsActive) {
      if (Array.isArray(hotels) && hotels.length) {
        searchResults = true;
      }
    }
    return searchResults;
  };

  return (
    <React.Fragment>
      <div>
        {filtersActives && (
          <h3 className="searchText">
            {checkResults(hotels)
              ? "Estos son los resultados de tu búsqueda: "
              : "Ops...lo siento. No pudimos encontrar lo que estabas buscando. "}
          </h3>
        )}
      </div>
      <section className="hotelList">
        {hotels.map((hotel) => {
          /* Sets different icons to display in hotel cards
          for prices */
          let price = checkPrice(hotel.price, priceIcon);

          return (
            <HotelCard
              key={hotel.slug}
              img={hotel.photo}
              name={hotel.name}
              description={hotel.description}
              city={hotel.city}
              country={hotel.country}
              rooms={hotel.rooms}
              price={price}
            />
          );
        })}
      </section>
    </React.Fragment>
  );
}

export default Hoteles;
