export interface FeatureInterface {
  text: string;
  available: boolean;
}

export interface PlanInterface {
  name: string;
  price: string;
  annualPrice: string;
  buttonText: string;
  buttonAction: string;
  mostPopular?: boolean;
  features: FeatureInterface[];
}
