import React, { useState } from 'react';
import type { BookingDetails } from '../types';
import { ServiceType } from '../types';
import { CalendarIcon, ClockIcon, HomeIcon, UserIcon, PhoneIcon, PencilIcon, BedIcon, BathIcon } from './icons';

interface BookingFormProps {
  onSubmit: (details: Omit<BookingDetails, 'bookingNumber'>) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Omit<BookingDetails, 'bookingNumber'>>({
    name: '',
    address: '',
    phone: '',
    serviceType: ServiceType.Standard,
    date: '',
    time: '',
    bedrooms: 1,
    bathrooms: 1,
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'bedrooms' || name === 'bathrooms') {
      const numValue = value === '' ? 1 : parseInt(value, 10);
      setFormData(prev => ({ ...prev, [name]: isNaN(numValue) ? 1 : numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <h1 className="text-3xl font-bold text-center mb-2 text-slate-800">Book Your Cleaning</h1>
      <p className="text-center text-slate-500 mb-8">Fill out the details below to schedule your appointment.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div className="relative">
            <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>
        <div className="relative">
          <HomeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <label htmlFor="serviceType" className="block text-sm font-medium text-slate-600 mb-2">Service Type</label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value={ServiceType.Standard}>Standard Cleaning</option>
              <option value={ServiceType.Deep}>Deep Cleaning</option>
              <option value={ServiceType.MoveInOut}>Move-In/Out Cleaning</option>
            </select>
          </div>
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-slate-600 mb-2">Bedrooms</label>
            <div className="relative">
              <BedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="bedrooms"
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                min="1"
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-slate-600 mb-2">Bathrooms</label>
            <div className="relative">
              <BathIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="bathrooms"
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                min="1"
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={today}
              required
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div className="relative">
            <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>
        <div className="relative">
          <PencilIcon className="absolute left-3 top-4 w-5 h-5 text-slate-400" />
          <textarea
            name="notes"
            placeholder="Additional Notes (e.g., pets, specific areas to focus on)"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookingForm;