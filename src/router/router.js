import React from "react";
import { Switch } from "react-router-dom";
import { Auth } from "../pages";
//exhibitions
import {
  NewExhibition,
  Exhibitions,
  Exhibition,
} from "../pages/ExhbitionPages";
// Museums
import { Museum, Museums, NewMuseum } from "../pages/MuseumPages";
// Bookings
import { Booking, NewBooking } from "../pages/BookingPages";
import { Profile } from "../pages";
import { Home } from "../pages";
import { AppRoute, GuestRoute } from ".";

function AppRouter() {
  return (
    <Switch>
      <GuestRoute path="/login" exact>
        <Auth isLogin={true} />
      </GuestRoute>
      <GuestRoute path="/signup" exact>
        <Auth />
      </GuestRoute>
      <GuestRoute exact path="/">
        <Home />
      </GuestRoute>
      {/* profile routes */}
      <AppRoute exact path="/profile">
        <Profile />
      </AppRoute>
      <AppRoute exact path="/new-booking">
        <NewBooking />
      </AppRoute>
      <AppRoute exact path="/bookings/:bookingId">
        <Booking />
      </AppRoute>
      {/* museums routes */}
      <AppRoute exact path="/new-museum">
        <NewMuseum />
      </AppRoute>
      <AppRoute exact path="/museums">
        <Museums />
      </AppRoute>
      <AppRoute exact path="/museums/:museumId">
        <Museum />
      </AppRoute>
      {/* exhibitions routes */}
      <AppRoute exact path="/new-exhibition">
        <NewExhibition />
      </AppRoute>
      <AppRoute exact path="/exhibitions">
        <Exhibitions />
      </AppRoute>
      <AppRoute exact path="/exhibitions/:exhibitionId">
        <Exhibition />
      </AppRoute>
    </Switch>
  );
}

export default AppRouter;
