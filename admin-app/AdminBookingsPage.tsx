import React, { useEffect, useState } from "react";
import * as api from "../services/databaseservice";
import { motion } from "framer-motion";

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
    } catch {
      setError("❌ Failed to update booking status.");
    }
  };

  const handleDeleteBooking = async (bookingId: number) => {
    try {
      await api.deleteBooking(bookingId);
      loadBookings();
    } catch {
      setError("❌ Failed to delete booking.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 mb-3">
            Admin Booking Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Manage, approve, and organize your customer bookings efficiently.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center shadow-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-gray-600 text-lg animate-pulse">
            Loading bookings...
          </div>
        )}

        {/* No Bookings */}
        {!loading && bookings.length === 0 && !error && (
          <p className="text-center text-gray-500 text-lg py-20">
            No bookings found.
          </p>
        )}

        {/* Bookings List */}
        {!loading && bookings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((b, index) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-sky-100 p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-sky-600 mb-1">
                    {b.service}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2 font-mono tracking-tight">
                    #{b.bookingNumber}
                  </p>

                  <div className="text-gray-700 space-y-1">
                    <p className="font-medium">{b.name}</p>
                    <p>{b.phone}</p>
                    <p>{b.address}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      {new Date(b.date).toLocaleDateString()} at {b.time}
                    </p>
                  </div>

                  <div className="mt-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm
                      ${b.status === "Approved"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : b.status === "Rejected"
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {b.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(b.id, "Approved")}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-full text-sm font-semibold shadow-md hover:from-green-600 hover:to-green-700 transition-all"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(b.id, "Rejected")}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-full text-sm font-semibold shadow-md hover:from-orange-600 hover:to-orange-700 transition-all"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDeleteBooking(b.id)}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-full text-sm font-semibold shadow-md hover:from-red-600 hover:to-red-700 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookingsPage;
