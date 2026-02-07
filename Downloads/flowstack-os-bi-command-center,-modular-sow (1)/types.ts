export interface WeeklyData {
  name: string;
  value: number;
  isCurrent?: boolean;
}

export interface IntentData {
  name: string;
  value: number;
  fill: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

export type ROIInputs = {
  monthlyLeads: number;
  dealValue: number;
};