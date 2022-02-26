import React from "react";
import { Switch } from "react-router-dom";
import { Auth } from "../pages";
//exhibitions
import {
  NewExhibition,
  Exhibitions,
  Exhibition,
  ExhibitionUpdate
} from "../pages/ExhibitionPages";
// Museums
import { Museum, Museums, NewMuseum, MuseumUpdate } from "../pages/MuseumPages";
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
      <Home exact path="/" />
        
      {/* profile routes */}
      <AppRoute exact path="/profile">
        <Profile />
      </AppRoute>
      <AppRoute exact path="/exhibitions/:exhibitionId/booking">
        <NewBooking />
      </AppRoute>
      <AppRoute exact path="/profile/:bookingId">
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
      <AppRoute exact path="/museums/:museumId/update">
        <MuseumUpdate />
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
      <AppRoute exact path="/exhibitions/:exhibitionId/update">
        <ExhibitionUpdate />
      </AppRoute>
    </Switch>
  );
}

export default AppRouter;
