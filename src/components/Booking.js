import React from "react";
import PropTypes from "prop-types";

import logo from "../logo.svg";
import "./Booking.scss";

class Booking extends React.Component {
    handleClick = () => {
        this.props.handleBookingClick(this.props.booking.bookingId);
    }

    render() {
        const { customerName, confirmation, category, startDate, endDate, status } = this.props.booking;
        return (
            <div className={`booking ${this.props.isSelected ? 'selected' : '' }`} onClick={this.handleClick}>
                <img className="image" src={logo} alt="logo" />
                <div className="customer">
                    <div className="booking-header">Customer</div>
                    <strong>{customerName}</strong>
                </div>
                <div className="status">
                <div className="booking-header">Status</div>
                    <strong>{status}</strong>
                </div>
                <div className="category">
                <div className="booking-header">Vehicle category</div>
                    <strong>{category}</strong>
                </div>
                <div className="reservation">
                <div className="booking-header">Reservation</div>
                    <strong>{confirmation}</strong>
                </div>
                <div className="dates">
                <div className="booking-header">Trip Dates</div>
                    <strong>{startDate}<br/></strong>
                    <strong>{endDate}</strong>
                </div>
            </div>
        );
    }
}

Booking.propTypes = {
    booking: PropTypes.shape({
        bookingId: PropTypes.number,
        category: PropTypes.string,
        customerName: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        status: PropTypes.string,
        confirmation: PropTypes.string,
        listingId: PropTypes.number
    }).isRequired,
    handleBookingClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired
}

export default Booking;
