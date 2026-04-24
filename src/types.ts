export type Grade = 'USP' | 'EP' | 'AJI' | 'Food' | 'Feed';

export interface Product {
  id: string;
  name: string;          // e.g., L-Arginine
  casNumber: string;    // CAS No.
  formula: string;       // Chemical formula
  grades: Grade[];       // Product grades
  purity: string;        // Purity percentage
  applications: string[];// Application fields
  description: string;   // Full description
  specSheetUrl?: string; // PDF link
  images: string[];      // Array of image URLs
  isFeatured: boolean;   // Featured on home
  molecularWeight: string; // Additional spec
  appearance: string;    // Powder/Crystal description
}

export interface Inquiry {
  id: string;
  productId: string;
  productName: string;
  userName: string;
  userEmail: string;
  companyName: string;
  message: string;
  createdAt: string;
}
