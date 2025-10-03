

export interface Product {
  id: string;                // UUID
  business_id: string;       // UUID of the business
  name: string;
  description: string;
  price: number;             // stored as number for calculations
  stock: number;
  public_url: string;        // from Cloudinary
  secure_url: string;        // from Cloudinary
  status: "active" | "inactive" // product state
  created_at: string;        // ISO date string from backend
  updated_at: string;        // ISO date string from backend
}