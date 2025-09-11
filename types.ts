// ✅ Service type constants + type
export const ServiceType = {
  Standard: "standard",
  Deep: "deep",
  MoveInOut: "move-in-out",
} as const;

export type ServiceType = typeof ServiceType[keyof typeof ServiceType];

// ✅ Booking details
export interface BookingDetails {
  name: string;
  address: string;
  phone: string;
  serviceType: ServiceType;
  date: string;
  time: string;
  notes?: string;
}

// Full object returned by backend
export interface Password {
  id: number;
  password: string;
}

// Only the data you send to create a password
export interface PasswordCreate {
  password: string;
}


// ✅ Notification details
export interface NotificationDetails {
  subject: string;
  summary: string;
  details: {
    name: string;
    address: string;
    phone: string;
    service: string;
    dateTime: string;
    notes: string;
  };
  suggestedAction: string;
}

// ✅ Generated SMS notifications
export interface GeneratedNotifications {
  bookingId: string;     // unique booking ID (e.g., APT-001)
  customerPhone: string; // customer's phone number (+1234567890 format)
  repPhone: string;      // representative's phone number
  message: string;       // full SMS body content
  date: string;          // appointment date
  time: string;          // appointment time
  service: string;       // service type
}

// ✅ Add SmsStatus if needed
export enum SmsStatus {
  PENDING = "pending",
  SENT = "sent",
  FAILED = "failed",
}