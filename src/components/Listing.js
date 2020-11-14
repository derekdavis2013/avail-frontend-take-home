import React from "react";
import PropTypes from "prop-types";

import logo from "../logo.svg";
import "./Listing.scss";

class Listing extends React.Component {
    handleClick = () => {
        this.props.handleListingClick(this.props.listing.listingId);
    }

    render() {
        const { vehicle, startDate, endDate } = this.props.listing;
        return (
            <div className="listing">
                <img className="image" src={logo} alt="logo" />
                <div className="vehicle">
                    <div className="listing-header">Vehicle</div>
                    <strong>{vehicle}</strong>
                </div>
                <div className="dates">
                    <div className="listing-header">Trip dates</div>
                    <strong>{startDate}</strong><br/>
                    <strong>{endDate}</strong>
                </div>
                <button className="pair-button" onClick={this.handleClick}>Pair</button>
            </div>
        )
    }
}

Listing.propTypes = {
    listing: PropTypes.shape({
        listingId: PropTypes.number,
        customerName: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        status: PropTypes.string,
        category: PropTypes.string,
        confirmation: PropTypes.string,
        vehicle: PropTypes.string
    }).isRequired,
    handleListingClick: PropTypes.func.isRequired
}

export default Listing;
