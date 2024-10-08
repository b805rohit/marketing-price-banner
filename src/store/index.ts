import { PlanInterface } from "../types";
import { ref } from "vue";

const plans = ref<PlanInterface[]>([
  {
    name: "Starter",
    price: "$29",
    annualPrice: "$19 USD per month, paid annually",
    buttonAction: "https://stripe.com",
    buttonText: "Get started",
    features: [
      { text: "All tools you need to manage payments", available: true },
      { text: "No setup, monthly, or hidden fees", available: true },
      { text: "Comprehensive security", available: true },
      { text: "Get hundreds of feature updates", available: false },
      { text: "Payouts to your bank account", available: false },
      { text: "Financial reconciliation and reporting", available: false },
      { text: "24x7 phone, chat, and email support", available: false },
      { text: "Robust developer platform", available: false },
    ],
  },
  {
    name: "Premium",
    price: "$199",
    annualPrice: "$159 USD per month, paid annually",
    buttonAction: "https://stripe.com",
    buttonText: "Get started",
    mostPopular: true,
    features: [
      { text: "All tools you need to manage payments", available: true },
      { text: "No setup, monthly, or hidden fees", available: true },
      { text: "Comprehensive security", available: true },
      { text: "Get hundreds of feature updates", available: true },
      { text: "Payouts to your bank account", available: true },
      { text: "Financial reconciliation and reporting", available: false },
      { text: "24x7 phone, chat, and email support", available: false },
      { text: "Robust developer platform", available: false },
      { text: "Robust developer platform", available: false },
    ],
  },
  {
    name: "Enterprise",
    price: "$599",
    annualPrice: "$499 USD per month, paid annually",
    buttonAction: "https://stripe.com",
    buttonText: "Get started",
    features: [
      { text: "All tools you need to manage payments", available: true },
      { text: "No setup, monthly, or hidden fees", available: true },
      { text: "Comprehensive security", available: true },
      { text: "Get hundreds of feature updates", available: true },
      { text: "Payouts to your bank account", available: true },
      { text: "Financial reconciliation and reporting", available: true },
      { text: "24x7 phone, chat, and email support", available: true },
      { text: "Robust developer platform", available: true },
    ],
  },
]);

const defaultStyles = ref({
  headlineFont: "Inter",
  contentFont: "Inter",
  headlineWeight: "700",
  contentWeight: "400",
  borderColor: "#e5e7eb",
  contentFontSize: "16px",
  headlineFontSize: "24px",
  mostPopularBorderColor: "#2563eb",
  mostPopularBgColor: "#eff6ff",
  mostPopularLabelColor: "#2563eb",
  annualPriceColor: "#6b7280",
  buttonBgColor: "black",
  mostPopularButtonBgColor: "#2563eb",
  featureUnavailableColor: "#9ca3af",
  textColor: "#111827",
});

export const useStore = () => {
  return {
    plans,
    defaultStyles,
  };
};

export default useStore;
