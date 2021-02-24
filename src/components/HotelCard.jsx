import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker, faBed } from "@fortawesome/free-solid-svg-icons";
/* This component renders a single hotel card. It takes
the hotel's information from a prop passed 
from component "Hoteles" */

function HotelCard(props) {
  return (
    <div className="hotelCard" key={props.slug}>
      <img src={props.img} alt={props.name} className="hotelCard__img" />
      <h3 className="hotelCard__name">{props.name}</h3>
      <p className="hotelCard__description">{props.description}</p>
      <div className="hotelCard__location">
        <FontAwesomeIcon
          icon={faMapMarker}
          className="hotelCard__location__icon"
        />
        <span className="hotelCard__location__text">
          {props.city}, {props.country}
        </span>
      </div>
      <div className="hotelCard__info">
        <div className="hotelCard__info__room">
          <FontAwesomeIcon
            icon={faBed}
            className="hotelCard__info__room__icon"
          />
          <span className="hotelCard__info__room__text">
            {props.rooms} Habitaciones
          </span>
        </div>
        <div className="hotelCard__info__price">
          <span className="hotelCard__info__price__text">{props.price}</span>
        </div>
      </div>
      <button className="hotelCard__btn">Reservar</button>
    </div>
  );
}

export default HotelCard;
