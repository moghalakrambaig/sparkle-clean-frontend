import React from 'react';
import { CheckCircleIcon, TicketIcon, MailIcon, UsersIcon, MobileIcon } from './icons.tsx';
import type { BookingDetails, GeneratedNotifications, SmsStatus } from '../types.ts';

interface ConfirmationProps {
  notifications: GeneratedNotifications;
  bookingDetails: BookingDetails;
  smsStatus: SmsStatus;
  onReset: () => void;
}

const SmsStatusIndicator: React.FC<{ status: SmsStatus }> = ({ status }) => {
  if (status === 'sent') {
    return (
      <div className="flex items-center justify-center gap-2 mt-4 text-green-700 bg-green-100 border border-green-200 rounded-lg p-3 text-sm">
        <MobileIcon className="w-5 h-5" />
        <span>SMS notifications sent successfully to you and our team.</span>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex items-center justify-center gap-2 mt-4 text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-lg p-3 text-sm">
        <MobileIcon className="w-5 h-5" />
        <span>Your booking is confirmed, but we couldn't send the SMS notifications. Please check your email.</span>
      </div>
    );
  }

  return null;
};

const Confirmation: React.FC<ConfirmationProps> = ({ notifications, bookingDetails, smsStatus, onReset }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center animate-fade-in">
      <div className="flex justify-center mb-4">
        <CheckCircleIcon className="w-16 h-16 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold text-slate-800">Appointment Confirmed!</h1>
      <p className="text-slate-500 mt-2 mb-6">
        Thank you, {bookingDetails.name}. We've received your request and have sent confirmations.
      </p>

      <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 my-6 text-center">
        <p className="text-sm font-medium text-slate-600 tracking-wide uppercase">Your Unique Booking Number</p>
        <div className="flex items-center justify-center gap-3 mt-2">
          <TicketIcon className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-slate-800 tracking-wider font-mono">{bookingDetails.bookingNumber}</h2>
        </div>
      </div>

      <SmsStatusIndicator status={smsStatus} />

      <h3 className="text-lg font-semibold text-center mt-6 mb-4 text-slate-700">Notifications Generated</h3>

      <div className="grid md:grid-cols-2 gap-6 text-left">
        {/* Customer Notification Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 flex flex-col">
          <div className="flex items-center mb-3">
            <MailIcon className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
            <h4 className="font-semibold text-blue-800">Confirmation Sent to You</h4>
          </div>
          <div className="flex-grow space-y-3">
            <p className="text-sm text-blue-900 bg-white p-3 rounded-md border border-blue-200">
              <strong className='block'>{notifications.customer.header}</strong>
              {notifications.customer.body}
            </p>
            <div className="text-xs text-blue-800 font-mono bg-white p-3 rounded-md border border-blue-200 space-y-1">
              <p><strong>Service:</strong> {notifications.customer.detailsSummary.service}</p>
              <p><strong>When:</strong> {notifications.customer.detailsSummary.dateTime}</p>
            </div>
          </div>
        </div>

        {/* Representative Notification Card */}
        {/* FIX: Corrected a typo in the className from 'bg-bg-teal-50' to 'bg-teal-50'. */}
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-5 flex flex-col">
          <div className="flex items-center mb-3">
            <UsersIcon className="w-6 h-6 text-teal-600 mr-3 flex-shrink-0" />
            <h4 className="font-semibold text-teal-800">Alert Sent to Our Team</h4>
          </div>
          <div className="flex-grow space-y-3">
            <p className="text-sm text-teal-900 bg-white p-3 rounded-md border border-teal-200 italic">
              "{notifications.representative.summary}"
            </p>
            <div className="text-sm text-teal-900 bg-white p-3 rounded-md border border-teal-200">
              <p><strong>Action:</strong> {notifications.representative.suggestedAction}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full mt-8 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors duration-300"
      >
        Book Another Appointment
      </button>
    </div>
  );
};

export default Confirmation;