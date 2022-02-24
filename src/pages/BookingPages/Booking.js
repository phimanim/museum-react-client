import React from "react";
import { getBookingById, deleteBooking, getExhibitionById } from "../../api";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Booking() {
  const history = useHistory();
  const { bookingId } = useParams();

  // const { booking } = getBookingById(bookingId);
  // console.log("id booking data", booking);
  async function getBookingData() {
    const { booking } = await getBookingById(bookingId);
    console.log("id Booking booking", booking);
  }

  React.useEffect(() => {
    getBookingData();
  }, []);

  // const { exhibitionId } = booking.exhibition;
  // console.log(exhibitionId);

  // const { exhibition } = getExhibitionById(exhibitionId);
  // console.log("id exhibition data", exhibition);

  const handleDelete = () => {
    deleteBooking(bookingId);
    history.push("/profile");
  };

  return (
    <div>
        <h2>{exhibition?.name}</h2>
        {exhibition?.imageUrl && <img src={exhibition?.imageUrl} />}
        <p>Date: {booking?.date}</p>
        <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Booking;
