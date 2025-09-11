import React, { useEffect, useState } from "react";
import * as api from "../services/databaseservice";

type BookingStatus = "Pending" | "Approved" | "Rejected";

interface Booking {
  id: number;
  bookingNumber: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  date: string;
  time: string;
  status: BookingStatus;
}

const AdminBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const allBookings = await api.getAllBookings();
      setBookings(allBookings.sort((a, b) => b.id - a.id));
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("❌ Failed to load bookings. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleUpdateStatus = async (bookingId: number, status: BookingStatus) => {
    try {
      await api.updateBookingStatus(bookingId, status);
      loadBookings();
    } catch (err) {
      setError("❌ Failed to update booking status.");
    }
  };

  const handleDeleteBooking = async (bookingId: number) => {
    try {
      await api.deleteBooking(bookingId);
      loadBookings();
    } catch (err) {
      setError("❌ Failed to delete booking.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-600">Loading bookings...</p>
      )}

      {/* No Bookings */}
      {!loading && bookings.length === 0 && !error && (
        <p className="text-center text-gray-500">No bookings found.</p>
      )}

      {/* Bookings List */}
      {!loading && bookings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white p-6 rounded-lg shadow-md border flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-sky-600">
                  {b.service}
                </h2>
                <p className="text-sm text-gray-500 mb-2 font-mono">
                  {b.bookingNumber}
                </p>
                <p className="text-gray-800 font-medium">{b.name}</p>
                <p className="text-gray-600">{b.phone}</p>
                <p className="text-gray-600">{b.address}</p>
                <p className="text-gray-600 mt-2">
                  {new Date(b.date).toLocaleDateString()} at {b.time}
                </p>
                <p className="mt-2">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${b.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : b.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                  >
                    {b.status}
                  </span>
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-4">
                {b.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(b.id, "Approved")}
                      className="px-3 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(b.id, "Rejected")}
                      className="px-3 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDeleteBooking(b.id)}
                  className="px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookingsPage;