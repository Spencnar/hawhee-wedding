// Email utility for sending RSVP notifications
// You can choose one of the following email services:

// Option 1: Resend (recommended - easy setup)
// 1. Sign up at resend.com
// 2. Get your API key
// 3. Add to .env.local: RESEND_API_KEY=your_api_key_here
// 4. Uncomment the Resend code below

// Option 2: SendGrid
// 1. Sign up at sendgrid.com
// 2. Get your API key
// 3. Add to .env.local: SENDGRID_API_KEY=your_api_key_here
// 4. Uncomment the SendGrid code below

// Option 3: Nodemailer with SMTP
// 1. Add to .env.local: SMTP_HOST=your_smtp_host, SMTP_PORT=587, SMTP_USER=your_email, SMTP_PASS=your_password
// 2. Uncomment the Nodemailer code below

export interface RSVPData {
  name: string;
  email: string;
  attending: string;
  guests?: string;
  dietaryRestrictions?: string;
  message?: string;
}

export async function sendRSVPEmail(data: RSVPData): Promise<boolean> {
  try {
    const emailContent = `
New RSVP Submission

Name: ${data.name}
Email: ${data.email}
Attending: ${data.attending}
Number of Guests: ${data.guests || 'Not specified'}
Dietary Restrictions: ${data.dietaryRestrictions || 'None'}
Message: ${data.message || 'No additional message'}

Submitted on: ${new Date().toLocaleString()}
    `;

    console.log('RSVP Email Content:', emailContent);
    console.log('Attempting to send email with Resend...');
    
    // Check if RESEND_API_KEY is set
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in environment variables');
      return false;
    }

    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Use a verified domain or Resend's default domain
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = process.env.RSVP_NOTIFICATION_EMAIL || 'ann.scott330@gmail.com';
    
    console.log(`Sending email from ${fromEmail} to ${toEmail}`);
    
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: 'New Wedding RSVP',
      text: emailContent,
    });
    
    console.log('Resend response:', result);
    console.log('Email sent successfully!');
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any)?.code,
      statusCode: (error as any)?.statusCode,
    });
    return false;
  }
} 