# Resend Email Setup Guide

## Current Issue
Your RSVP form is working but emails aren't being received. Here's how to fix it:

## Step 1: Environment Variables
Create a `.env.local` file in your project root with:

```env
RESEND_API_KEY=your_resend_api_key_here
RSVP_NOTIFICATION_EMAIL=teamfallenhax@gmail.com
FROM_EMAIL=onboarding@resend.dev
```

## Step 2: Get Your Resend API Key
1. Go to [resend.com](https://resend.com) and sign in
2. Go to the API Keys section
3. Copy your API key
4. Paste it in your `.env.local` file

## Step 3: Verify Your Domain (Optional but Recommended)
For production, you should verify your domain:
1. In Resend dashboard, go to Domains
2. Add your domain (e.g., yourdomain.com)
3. Follow the DNS verification steps
4. Update `FROM_EMAIL` in `.env.local` to use your domain

## Step 4: Test the Setup
1. Restart your development server: `npm run dev`
2. Submit a test RSVP
3. Check the console logs for detailed error messages
4. Check your email (including spam folder)

## Common Issues & Solutions

### Issue: "RESEND_API_KEY is not set"
- Make sure your `.env.local` file exists and has the correct API key
- Restart your development server after adding environment variables

### Issue: "Domain not verified"
- Use `onboarding@resend.dev` as the FROM_EMAIL for testing
- For production, verify your domain in Resend

### Issue: Emails going to spam
- Check your spam/junk folder
- Verify your domain in Resend
- Use a proper FROM_EMAIL address

### Issue: API key invalid
- Double-check your API key in the Resend dashboard
- Make sure there are no extra spaces in your `.env.local` file

## Debugging
The updated code now includes detailed logging. Check your console for:
- "Attempting to send email with Resend..."
- "Sending email from [from] to [to]"
- "Resend response: [result]"
- Any error messages with details

## Next Steps
1. Set up your environment variables
2. Test the form
3. Check console logs for any errors
4. Let me know what error messages you see 