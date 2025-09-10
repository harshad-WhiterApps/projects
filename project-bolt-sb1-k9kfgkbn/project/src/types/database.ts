export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'inventory_manager' | 'pharmacist' | 'procurement_officer' | 'auditor';
  department?: string;
  location_id?: string;
  phone?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: string;
  name: string;
  address?: string;
  type: 'hospital' | 'department' | 'pharmacy' | 'warehouse';
  parent_location_id?: string;
  manager_id?: string;
  is_active: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  parent_category_id?: string;
  requires_prescription: boolean;
  created_at: string;
}

export interface Vendor {
  id: string;
  name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  payment_terms?: string;
  is_active: boolean;
  created_at: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  description?: string;
  category_id: string;
  sku: string;
  unit_of_measure: string;
  min_stock_level: number;
  max_stock_level?: number;
  reorder_point: number;
  preferred_vendor_id?: string;
  unit_price?: number;
  requires_prescription: boolean;
  storage_requirements?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
  vendor?: Vendor;
}

export interface StockBatch {
  id: string;
  item_id: string;
  location_id: string;
  batch_number: string;
  lot_number?: string;
  quantity: number;
  initial_quantity: number;
  expiry_date?: string;
  received_date: string;
  cost_per_unit?: number;
  vendor_id?: string;
  purchase_order_id?: string;
  is_expired: boolean;
  created_at: string;
  updated_at: string;
  item?: InventoryItem;
  location?: Location;
  vendor?: Vendor;
}

export interface StockMovement {
  id: string;
  batch_id: string;
  movement_type: 'in' | 'out' | 'transfer' | 'adjustment' | 'expired';
  quantity: number;
  reference_number?: string;
  notes?: string;
  performed_by: string;
  location_from?: string;
  location_to?: string;
  created_at: string;
  batch?: StockBatch;
  performed_by_profile?: Profile;
}

export interface RestockAlert {
  id: string;
  item_id: string;
  location_id: string;
  alert_type: 'low_stock' | 'out_of_stock' | 'expiring_soon' | 'expired';
  current_quantity: number;
  threshold_quantity: number;
  message: string;
  is_acknowledged: boolean;
  acknowledged_by?: string;
  acknowledged_at?: string;
  created_at: string;
  item?: InventoryItem;
  location?: Location;
}

export interface PurchaseOrder {
  id: string;
  po_number: string;
  vendor_id: string;
  location_id: string;
  status: 'draft' | 'submitted' | 'approved' | 'shipped' | 'received' | 'cancelled';
  total_amount?: number;
  order_date: string;
  expected_delivery?: string;
  actual_delivery?: string;
  created_by: string;
  approved_by?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  vendor?: Vendor;
  location?: Location;
  items?: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
  id: string;
  purchase_order_id: string;
  item_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  received_quantity: number;
  created_at: string;
  item?: InventoryItem;
}

export interface DashboardStats {
  total_items: number;
  low_stock_alerts: number;
  expiring_soon: number;
  total_value: number;
  recent_movements: number;
  active_vendors: number;
}