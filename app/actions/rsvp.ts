'use server';

import { sendRSVPEmail, RSVPData } from '@/lib/email';

// Define the state type
export type FormState = {
  success: boolean | null;
  message: string;
};

// Server action for form submission
export async function submitRSVP(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    // Honeypot spam protection
    const honeypot = formData.get('website');
    if (honeypot) {
      return { success: false, message: 'Invalid submission' };
    }

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const attending = formData.get('attending') as string;
    const guests = formData.get('guests') as string;
    const dietaryRestrictions = formData.get('dietaryRestrictions') as string;
    const message = formData.get('message') as string;

    // Basic validation
    if (!name || !email || !attending) {
      return { success: false, message: 'Please fill in all required fields' };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: 'Please enter a valid email address' };
    }

    // Prepare RSVP data
    const rsvpData: RSVPData = {
      name,
      email,
      attending,
      guests,
      dietaryRestrictions,
      message,
    };

    // Send email
    const emailSent = await sendRSVPEmail(rsvpData);
    
    if (!emailSent) {
      return { success: false, message: 'There was an error sending your RSVP. Please try again.' };
    }

    return { success: true, message: 'Thank you for your RSVP! We look forward to celebrating with you.' };
  } catch (error) {
    console.error('RSVP submission error:', error);
    return { success: false, message: 'There was an error submitting your RSVP. Please try again.' };
  }
} 