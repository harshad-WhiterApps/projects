/*
  # Seed demo data for testing

  1. Demo Users
    - Create sample profiles with different roles
    - Admin user for testing

  2. Demo Expenses
    - Sample expenses with different statuses
    - Various categories and amounts
*/

-- Insert demo profiles (these will be created when users sign up)
-- The trigger will handle profile creation automatically

-- Note: In a real application, you would sign up users through the auth system
-- This is just for reference of the expected data structure

-- Demo admin user profile (will be created via trigger when user signs up)
-- Email: admin@company.com, Password: password123

-- Demo manager user profile
-- Email: manager@company.com, Password: password123

-- Demo employee user profile  
-- Email: employee@company.com, Password: password123

-- The actual user creation should be done through Supabase Auth signup
-- These are just placeholder comments showing the expected user structure