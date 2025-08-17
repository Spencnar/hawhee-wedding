# Email Setup for RSVP Form

Your RSVP form is now functional with spam protection and user feedback! To enable actual email notifications, follow these steps:

## Quick Setup (Recommended)

### Option 1: Resend (Easiest)
1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Create a `.env.local` file in your project root with:
   ```
   RESEND_API_KEY=your_api_key_here
   RSVP_NOTIFICATION_EMAIL=your-email@example.com
   ```
4. In `lib/email.ts`, uncomment the Resend code section
5. Update the `from` and `to` email addresses in the code

### Option 2: SendGrid
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get your API key from the dashboard
3. Create a `.env.local` file with:
   ```
   SENDGRID_API_KEY=your_api_key_here
   RSVP_NOTIFICATION_EMAIL=your-email@example.com
   ```
4. In `lib/email.ts`, uncomment the SendGrid code section
5. Update the email addresses in the code

### Option 3: Nodemailer with SMTP
1. Create a `.env.local` file with your SMTP settings:
   ```
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_email@example.com
   SMTP_PASS=your_email_password
   RSVP_NOTIFICATION_EMAIL=your-email@example.com
   ```
2. In `lib/email.ts`, uncomment the Nodemailer code section
3. Update the email addresses in the code

## Features Included

✅ **Spam Protection**: Honeypot field to catch bots
✅ **Form Validation**: Required fields and email format validation
✅ **User Feedback**: Success/error messages and loading states
✅ **Responsive Design**: Works on all devices
✅ **Additional Fields**: Guest count, dietary restrictions, and messages

## Current Status

The form is fully functional and will log RSVP submissions to the console. Once you configure an email service, it will send actual email notifications.

## Testing

1. Fill out the RSVP form
2. Check the browser console for the email content
3. After email setup, you'll receive actual email notifications 