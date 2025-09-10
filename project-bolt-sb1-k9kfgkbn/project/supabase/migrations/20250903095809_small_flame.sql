/*
  # Medical Inventory Management System - Initial Schema

  1. New Tables
    - `profiles` - User profiles with role-based access control
    - `locations` - Hospital departments/branches for multi-location support
    - `categories` - Item categorization (medicines, equipment, consumables)
    - `vendors` - Supplier and vendor information
    - `inventory_items` - Master inventory items with detailed specifications
    - `stock_batches` - Individual stock batches with expiry tracking
    - `stock_movements` - Audit trail of all inventory transactions
    - `restock_alerts` - Auto-generated alerts for low stock levels
    - `purchase_orders` - Procurement order management
    - `compliance_logs` - Regulatory compliance and audit trail

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Secure authentication with user roles

  3. Features
    - Real-time stock tracking with FIFO management
    - Auto-restock alerts with vendor integration
    - Comprehensive audit trail for compliance
    - Multi-location inventory support
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles with role-based access
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'inventory_manager', 'pharmacist', 'procurement_officer', 'auditor')),
  department text,
  location_id uuid,
  phone text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (id)
);

-- Locations (hospitals, departments, branches)
CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  type text NOT NULL CHECK (type IN ('hospital', 'department', 'pharmacy', 'warehouse')),
  parent_location_id uuid REFERENCES locations(id),
  manager_id uuid REFERENCES profiles(id),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Item categories
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  parent_category_id uuid REFERENCES categories(id),
  requires_prescription boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Vendors and suppliers
CREATE TABLE IF NOT EXISTS vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_person text,
  email text,
  phone text,
  address text,
  payment_terms text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Master inventory items
CREATE TABLE IF NOT EXISTS inventory_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category_id uuid REFERENCES categories(id),
  sku text UNIQUE NOT NULL,
  unit_of_measure text NOT NULL,
  min_stock_level integer DEFAULT 0,
  max_stock_level integer,
  reorder_point integer DEFAULT 0,
  preferred_vendor_id uuid REFERENCES vendors(id),
  unit_price decimal(10,2),
  requires_prescription boolean DEFAULT false,
  storage_requirements text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Stock batches with expiry tracking
CREATE TABLE IF NOT EXISTS stock_batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid REFERENCES inventory_items(id) ON DELETE CASCADE,
  location_id uuid REFERENCES locations(id),
  batch_number text NOT NULL,
  lot_number text,
  quantity integer NOT NULL DEFAULT 0,
  initial_quantity integer NOT NULL,
  expiry_date date,
  received_date date DEFAULT CURRENT_DATE,
  cost_per_unit decimal(10,2),
  vendor_id uuid REFERENCES vendors(id),
  purchase_order_id uuid,
  is_expired boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT positive_quantity CHECK (quantity >= 0)
);

-- Stock movements audit trail
CREATE TABLE IF NOT EXISTS stock_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id uuid REFERENCES stock_batches(id),
  movement_type text NOT NULL CHECK (movement_type IN ('in', 'out', 'transfer', 'adjustment', 'expired')),
  quantity integer NOT NULL,
  reference_number text,
  notes text,
  performed_by uuid REFERENCES profiles(id),
  location_from uuid REFERENCES locations(id),
  location_to uuid REFERENCES locations(id),
  created_at timestamptz DEFAULT now()
);

-- Restock alerts
CREATE TABLE IF NOT EXISTS restock_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid REFERENCES inventory_items(id),
  location_id uuid REFERENCES locations(id),
  alert_type text NOT NULL CHECK (alert_type IN ('low_stock', 'out_of_stock', 'expiring_soon', 'expired')),
  current_quantity integer,
  threshold_quantity integer,
  message text NOT NULL,
  is_acknowledged boolean DEFAULT false,
  acknowledged_by uuid REFERENCES profiles(id),
  acknowledged_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Purchase orders
CREATE TABLE IF NOT EXISTS purchase_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  po_number text UNIQUE NOT NULL,
  vendor_id uuid REFERENCES vendors(id),
  location_id uuid REFERENCES locations(id),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'shipped', 'received', 'cancelled')),
  total_amount decimal(12,2),
  order_date date DEFAULT CURRENT_DATE,
  expected_delivery date,
  actual_delivery date,
  created_by uuid REFERENCES profiles(id),
  approved_by uuid REFERENCES profiles(id),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Purchase order line items
CREATE TABLE IF NOT EXISTS purchase_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id uuid REFERENCES purchase_orders(id) ON DELETE CASCADE,
  item_id uuid REFERENCES inventory_items(id),
  quantity integer NOT NULL,
  unit_price decimal(10,2),
  total_price decimal(12,2),
  received_quantity integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Compliance logs
CREATE TABLE IF NOT EXISTS compliance_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action_type text NOT NULL,
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  old_values jsonb,
  new_values jsonb,
  user_id uuid REFERENCES profiles(id),
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Add foreign key for location in profiles
ALTER TABLE profiles ADD CONSTRAINT fk_profiles_location 
  FOREIGN KEY (location_id) REFERENCES locations(id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE restock_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for locations
CREATE POLICY "All authenticated users can view locations" ON locations
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and managers can modify locations" ON locations
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'inventory_manager')
    )
  );

-- RLS Policies for categories
CREATE POLICY "All authenticated users can view categories" ON categories
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and managers can modify categories" ON categories
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'inventory_manager')
    )
  );

-- RLS Policies for vendors
CREATE POLICY "All authenticated users can view vendors" ON vendors
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and procurement can modify vendors" ON vendors
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'inventory_manager', 'procurement_officer')
    )
  );

-- RLS Policies for inventory_items
CREATE POLICY "All authenticated users can view items" ON inventory_items
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and managers can modify items" ON inventory_items
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'inventory_manager')
    )
  );

-- RLS Policies for stock_batches
CREATE POLICY "All authenticated users can view stock" ON stock_batches
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Staff can modify stock in their location" ON stock_batches
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND 
      (role IN ('admin', 'inventory_manager') OR location_id = stock_batches.location_id)
    )
  );

-- RLS Policies for stock_movements
CREATE POLICY "All authenticated users can view movements" ON stock_movements
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Staff can create movements" ON stock_movements
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'inventory_manager', 'pharmacist')
    )
  );

-- RLS Policies for alerts
CREATE POLICY "Users can view relevant alerts" ON restock_alerts
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Staff can acknowledge alerts" ON restock_alerts
  FOR UPDATE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'inventory_manager', 'procurement_officer')
    )
  );

-- RLS Policies for purchase orders
CREATE POLICY "All authenticated users can view POs" ON purchase_orders
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Procurement staff can manage POs" ON purchase_orders
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'inventory_manager', 'procurement_officer')
    )
  );

-- RLS Policies for purchase order items
CREATE POLICY "Users can view PO items" ON purchase_order_items
  FOR SELECT TO authenticated USING (true);

-- RLS Policies for compliance logs (auditors and admins only)
CREATE POLICY "Auditors can view compliance logs" ON compliance_logs
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'auditor')
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_stock_batches_item_location ON stock_batches(item_id, location_id);
CREATE INDEX IF NOT EXISTS idx_stock_batches_expiry ON stock_batches(expiry_date) WHERE expiry_date IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_stock_movements_batch ON stock_movements(batch_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_date ON stock_movements(created_at);
CREATE INDEX IF NOT EXISTS idx_restock_alerts_item ON restock_alerts(item_id, location_id);
CREATE INDEX IF NOT EXISTS idx_inventory_items_sku ON inventory_items(sku);

-- Insert default categories
INSERT INTO categories (name, description) VALUES
('Medicines', 'Pharmaceutical products and drugs'),
('Equipment', 'Medical equipment and devices'),
('Consumables', 'Single-use medical supplies'),
('Surgical', 'Surgical instruments and supplies')
ON CONFLICT (name) DO NOTHING;

-- Insert default location
INSERT INTO locations (name, type) VALUES
('Main Hospital', 'hospital')
ON CONFLICT DO NOTHING;