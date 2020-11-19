import React from "react";

import Booking from './Booking';
import Listing from './Listing';
import { getBookings, getListings } from '../api';
import './Home.scss'

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allBookings: null,
            allListings: null,
            filterdListings: null,
            selectedBooking: null
        };
    }

    componentDidMount() {
        this.fetchBookings();
        this.fetchListings();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.selectedBooking !== this.state.selectedBooking) {
            this.filterListings();
        }
    }

    fetchBookings() {
        getBookings().then((res) => {
            const allBookings = res;
            this.setState(() => ({allBookings}));
        });
    }

    fetchListings() {
        getListings().then((res) => {
            const allListings = res;
            this.setState(() => ({allListings}))
        })
    }

    filterListings() {
        let filterdListings = null;

        if(this.state.selectedBooking !== null) {
            const bookingStart = new Date(this.state.selectedBooking.startDate);
            const bookingEnd = new Date(this.state.selectedBooking.endDate);

            filterdListings = this.state.allListings.filter((l) => {
                const listingStart = new Date(l.startDate);
                const listingEnd = new Date(l.endDate);
                
                return l.status === 'current' &&
                    bookingStart > listingStart && 
                    bookingEnd < listingEnd;
            });
        }

        this.setState(() => ({filterdListings}));
    }

    pairBooking(listingId) {
        // Find and updated booking
        const bookingIndex = this.state.allBookings.findIndex(b => b.bookingId === this.state.selectedBooking.bookingId);
        let allBookings = [...this.state.allBookings];
        allBookings[bookingIndex] = {...this.state.selectedBooking, listingId: listingId, status: "paired"};

        return allBookings;
    }

    pairListing(listingId) {
        // Find and updated listing
        const listingIndex = this.state.allListings.findIndex(l => l.listingId === listingId);
        let allListings = [...this.state.allListings];
        allListings[listingIndex] = {...allListings[listingIndex], status: "paired"};

        return allListings;
    }

    handleBookingClick = (bookingId) => {
        const selectedBooking = this.state.allBookings.find(b => b.bookingId === bookingId);
        this.setState(() => ({selectedBooking}));
    }

    handleListingClick = (listingId) => {
        const allBookings = this.pairBooking(listingId);
        const allListings = this.pairListing(listingId);
        
        // Reset selection
        const selectedBooking = null;

        this.setState(() => ({allBookings, allListings, selectedBooking}));
    }

    renderBookings() {
        const bookings = [];
        if(this.state.allBookings !== null) {
            const upcoming = this.state.allBookings.filter(b => b.status === "upcoming");
            upcoming.forEach((b) => {
                bookings.push(
                    <Booking
                        key={b.bookingId}
                        booking={b}
                        isSelected={b === this.state.selectedBooking}
                        handleBookingClick={this.handleBookingClick}
                    />
                );
            });
        }

        return bookings;
    }

    renderListings() {
        const { filterdListings } = this.state;
        const listings = [];
        if(filterdListings !== null) {
            if(filterdListings.length) {
                this.state.filterdListings.forEach((l) => {
                    listings.push(
                        <Listing key={l.listingId} listing={l} handleListingClick={this.handleListingClick} />
                    );
                });
            } else {
                listings.push(
                    <h2 key={0}>No listings found</h2>
                );
            }
        } 
        else {
            listings.push(
                <h2 key={0}>Please select a booking</h2>
            );
        } 

        return listings;
    }

    render() {
        return (
            <div className="home">
                <div className="container">
                    <div className="bookings">{this.renderBookings()}</div>
                    <div className="listings">{this.renderListings()}</div>
                </div>
            </div>
        );
    }
}

export default Home;
