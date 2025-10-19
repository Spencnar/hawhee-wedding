# Supabase Setup for Photo Gallery

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a name for your project (e.g., "hawhee-wedding")
3. Set a database password and select a region close to your users

## 2. Set up Storage

1. In your Supabase dashboard, go to **Storage** in the left sidebar
2. Click **Create a new bucket**
3. Name it `photos`
4. Make it **Public** so uploaded images can be viewed by anyone
5. Click **Create bucket**

## 3. Create Database Table

1. Go to **SQL Editor** in your Supabase dashboard
2. Run this SQL to create the photos table:

```sql
CREATE TABLE photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  filename TEXT NOT NULL,
  uploaded_by TEXT DEFAULT 'Anonymous',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert photos
CREATE POLICY "Anyone can upload photos" ON photos
  FOR INSERT WITH CHECK (true);

-- Create policy to allow anyone to view photos
CREATE POLICY "Anyone can view photos" ON photos
  FOR SELECT USING (true);

-- Create policy to allow anyone to delete photos
CREATE POLICY "Anyone can delete photos" ON photos
  FOR DELETE USING (true);
```

## 4. Set up Environment Variables

1. Create a `.env.local` file in your project root
2. Add these variables with your Supabase project values:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project dashboard under **Settings** > **API**.

## 5. Configure Storage Policies

1. Go to **Storage** > **Policies** in your Supabase dashboard
2. Create policies for the `photos` bucket:

**Policy 1: Upload**
- **Policy Name:** "Anyone can upload photos"
- **Policy Definition:**
```sql
bucket_id = 'photos'
```
- **Policy Type:** INSERT
- **Target Roles:** public

**Policy 2: View**
- **Policy Name:** "Anyone can view photos"
- **Policy Definition:**
```sql
bucket_id = 'photos'
```
- **Policy Type:** SELECT
- **Target Roles:** public

**Policy 3: Delete**
- **Policy Name:** "Anyone can delete photos"
- **Policy Definition:**
```sql
bucket_id = 'photos'
```
- **Policy Type:** DELETE
- **Target Roles:** public

## 6. Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to `/photos` in your browser
3. Try uploading a photo to test the functionality

## Security Notes

- The current setup allows anyone to upload and view photos without authentication
- For production, you might want to add rate limiting or file size restrictions
- Consider adding image optimization or compression for better performance
