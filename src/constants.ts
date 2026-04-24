import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'L-Arginine',
    casNumber: '74-79-3',
    formula: 'C6H14N4O2',
    molecularWeight: '174.20',
    grades: ['USP', 'AJI', 'Food'],
    purity: '≥98.5%',
    appearance: 'White crystalline powder',
    applications: ['Pharmaceuticals', 'Dietary Supplements', 'Clinical Nutrition'],
    description: 'L-Arginine is a semi-essential amino acid that plays a critical role in ammonia detoxification, hormone secretion, and immune modulation. As a precursor of nitric oxide, it is widely used in cardiovascular health applications.',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'],
    isFeatured: true
  },
  {
    id: '2',
    name: 'L-Leucine',
    casNumber: '61-90-5',
    formula: 'C6H13NO2',
    molecularWeight: '131.17',
    grades: ['USP', 'EP', 'Feed'],
    purity: '≥99.0%',
    appearance: 'White crystalline or crystalline powder',
    applications: ['Muscular Growth', 'Sports Nutrition', 'Amino Acid Infusion'],
    description: 'L-Leucine is an essential branch-chain amino acid (BCAA) that acts as a primary trigger for protein synthesis in muscles. It is essential for nitrogen balance and muscle tissue repair.',
    images: ['https://images.unsplash.com/photo-1579154235828-ac51e5a3b2b6?auto=format&fit=crop&q=80&w=800'],
    isFeatured: true
  }
];
