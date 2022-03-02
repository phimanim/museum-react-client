import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export function login(credentials) {
  return api.post("/login", credentials);
}

export function signup(credentials) {
  return api.post("/signup", credentials);
}

export function logout() {
  return api.post("/logout");
}

export function isLoggedIn() {
  return api.get("/login");
}
// museums
export function getMuseums() {
  return api.get("/museums");
}
export function getMuseumById(museumId) {
  return api.get(`/museums/${museumId}`);
}
export function createMuseum(museum) {
  return api.post("/museums", museum);
}
export function updateMuseum(museumId, museum) {
  return api.put(`/museums/${museumId}`, museum);
}
export function deleteMuseum(museumId, museum) {
  return api.delete(`/museums/${museumId}`, museum);
}
export function addExhibitions(museumId) {
  return api.get(`/museums/exhibitions/${museumId}`);
}
// exhibitions
export function getExhibitions() {
  return api.get("/exhibitions");
}
export function getExhibitionById(exhibitionId) {
  return api.get(`/exhibitions/${exhibitionId}`);
}
export function createExhibition(exhibition) {
  return api.post("/exhibitions", exhibition);
}
export function updateExhibition(exhibitionId, exhibition) {
  return api.put(`/exhibitions/${exhibitionId}`, exhibition);
}
export function deleteExhibition(exhibitionId, exhibition) {
  return api.delete(`/exhibitions/${exhibitionId}`, exhibition);
}
// bookings
export function getBookings() {
  return api.get("/bookings");
}
export function getBookingById(bookingId) {
  return api.get(`/bookings/${bookingId}`);
}
export function createBooking(booking) {
  return api.post("/bookings", booking);
}
export function updateBooking(bookingId, booking) {
  return api.put(`/bookings/${bookingId}`, booking);
}
export function deleteBooking(bookingId, booking) {
  return api.delete(`/bookings/${bookingId}`, booking);
}
// likes
export function getLikes() {
  return api.get("/likes");
}
export function getLikeById(likeId) {
  return api.get(`/likes/${likeId}`);
}
export function createLike(like) {
  return api.post("/likes", like);
}
export function updateLike(likeId, like) {
  return api.put(`/likes/${likeId}`, like);
}
export function deleteLike(likeId, like) {
  return api.delete(`/likes/${likeId}`, like);
}
//files
export async function uploadImage(file) {
  return api.post("/image-upload", file);
}
