/*
  # Create expenses table for expense management

  1. New Tables
    - `expenses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `description` (text)
      - `amount` (decimal)
      - `category` (text)
      - `expense_date` (date)
      - `merchant` (text)
      - `project` (text, optional)
      - `notes` (text, optional)
      - `receipt_url` (text, optional)
      - `status` (enum: pending, approved, rejected)
      - `approved_by` (uuid, references profiles, optional)
      - `approved_at` (timestamp, optional)
      - `approval_comment` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `expenses` table
    - Add policies for users to manage their own expenses
    - Add policies for managers/finance to approve expenses
*/

-- Create enum for expense status
CREATE TYPE expense_status AS ENUM ('pending', 'approved', 'rejected');

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  description text NOT NULL,
  amount decimal(10,2) NOT NULL CHECK (amount > 0),
  category text NOT NULL,
  expense_date date NOT NULL,
  merchant text NOT NULL,
  project text,
  notes text,
  receipt_url text,
  status expense_status DEFAULT 'pending',
  approved_by uuid REFERENCES profiles(id),
  approved_at timestamptz,
  approval_comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own expenses"
  ON expenses
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own expenses"
  ON expenses
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own pending expenses"
  ON expenses
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() AND status = 'pending');

CREATE POLICY "Managers can read all expenses"
  ON expenses
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.role IN ('manager', 'finance', 'admin')
    )
  );

CREATE POLICY "Managers can update expense status"
  ON expenses
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.role IN ('manager', 'finance', 'admin')
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_status ON expenses(status);
CREATE INDEX IF NOT EXISTS idx_expenses_created_at ON expenses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_expenses_expense_date ON expenses(expense_date DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_expenses_updated_at ON expenses;
CREATE TRIGGER update_expenses_updated_at
  BEFORE UPDATE ON expenses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();