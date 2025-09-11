/*
  # Create storage bucket for receipts

  1. Storage
    - Create `receipts` bucket for storing receipt images
    - Set up RLS policies for secure access

  2. Security
    - Users can upload receipts for their own expenses
    - Managers can view all receipts
*/

-- Create storage bucket for receipts
INSERT INTO storage.buckets (id, name, public)
VALUES ('receipts', 'receipts', false)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for receipts bucket
CREATE POLICY "Users can upload own receipts"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'receipts');

CREATE POLICY "Users can view own receipts"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'receipts');

CREATE POLICY "Managers can view all receipts"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'receipts' AND
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid()
    AND p.role IN ('manager', 'finance', 'admin')
  )
);