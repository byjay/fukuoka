
export interface Place {
  id: string;
  category: string;
  // Dual Language Data
  name_en: string;
  name_ko: string;
  summary_en: string; 
  summary_ko: string;
  
  location?: string;
  rating?: string; // e.g., "4.5"
  priceLevel?: string; // e.g., "$$"
  priceNum?: number; // Numeric price for sorting
  mapLink: string; // Official Google Maps link
  photoSearchLink: string; // Direct link to photos tab or image search
  sourceTitle: string;
  // Metadata for the local file system structure (Strictly English for file compatibility)
  imageFileName: string; 
  
  // Rich Data Fields
  operatingHours?: string;
  ticketInfo?: string;     // Entrance fees
  menuInfo?: string;       // Detailed menu list with prices
  travelTips?: string;     // Warnings or Tips (Cash only, etc.)
  essentialItems?: string; // Items to prepare (for shopping affiliate)
}

export interface CollectedData {
  city: string;
  category: string;
  places: Place[];
  rawText: string;
}

export enum CollectionStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

export interface CategoryState {
  id: string;
  name: string; // Display name e.g. "Restaurants"
  status: CollectionStatus;
  count: number;
}

// Trip Configuration
export interface TripSettings {
  originCity: string; // Display Name e.g. "Incheon (ICN)"
  originCode: string; // Airport Code e.g. "ICN"
  hotel: string;
  days: number;
  style: string; // e.g. "Foodie", "Relaxed", "Compact", "Luxury"
  startDate?: string; // YYYY-MM-DD
}

// Monetization & Affiliate
export interface AffiliateConfig {
  coupangId: string;   // e.g. AF12345
  naverId: string;     // e.g. user_123
  klookId: string;     // e.g. 12345
  agodaId: string;     // e.g. 123456 (CID)
  tripComId: string;   // e.g. 12345 (AID)
  viatorId: string;    // e.g. 12345 (PID)
  gygId: string;       // GetYourGuide Partner ID
}

export interface Alternative {
  name: string;
  type: string;
  reason: string;
}

export interface ItineraryItem {
  timeOfDay: string; // "Morning", "Lunch", "Afternoon", "Dinner"
  placeId: string; // ID from the Place interface if matched
  placeName: string;
  description_en: string; 
  description_ko: string;
  alternatives?: Alternative[]; // Nearby fallback options
}

export interface ItineraryDay {
  day: number;
  items: ItineraryItem[];
}

export interface BudgetBreakdown {
  currency: string; // e.g., "JPY", "EUR"
  exchangeRate: number; // Approx KRW rate
  foodCost: number;
  transportCost: number;
  ticketCost: number;
  totalLocal: number;
  totalKrw: number;
}

export interface PackingItem {
  item: string;
  reason: string;
  category: string; // "Electronics", "Clothing", "Documents"
}

export interface FlightAnalysis {
  origin: string;
  destination: string;
  isDirectLikely: boolean; // Does a direct flight usually exist?
  warningMessage?: string; // e.g. "No direct flights from Daegu to Paris."
  recommendedRoute?: string; // e.g. "Transfer at Incheon (ICN)"
  estPrice?: string;
}

export interface ItineraryOption {
  id: number;
  title_en: string;
  title_ko: string;
  description: string;
  days: ItineraryDay[];
  budget: BudgetBreakdown;
  packingList: PackingItem[];
  flightAnalysis?: FlightAnalysis; // New field for route advice
}
