import { Platform } from "react-native";

const API_URL = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

export interface CreateCustomerParams {
  email: string;
  name: string;
}

export interface CreateCustomerResponse {
  customer: string;
  customerSessionClientSecret: string;
}

export const createCustomer = async (
  params: CreateCustomerParams
): Promise<CreateCustomerResponse> => {
  const response = await fetch(`${API_URL}/setup-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to create customer');
  }

  return data;
};

export interface CreatePaymentIntentParams {
  paymentMethodId: string;
  amount: number;
  currency: string;
  setup_future_usage?: string;
  storeCreditApplied?: number;
  total?: number;
  customerId?: string;
  saveCard?: boolean;
}

export interface PaymentIntentResponse {
  clientSecret?: string;
  paidWithStoreCredit?: boolean;
}

export async function createPaymentIntent(
  params: CreatePaymentIntentParams
): Promise<PaymentIntentResponse> {
  const response = await fetch(`${API_URL}/create-intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export interface CreateSubscriptionIntentParams {
  amount: number;
  currency?: string;
  customerId: string;
  productNames?: string[];
}

export interface CreateSubscriptionIntentResponse {
  subscriptionId: string;
  clientSecret: string;
  status: string;
  currentPeriodEnd: number;
}

export const createSubscriptionIntent = async (
  params: CreateSubscriptionIntentParams
): Promise<CreateSubscriptionIntentResponse> => {
  const response = await fetch(`${API_URL}/create-subscription-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to create subscription intent');
  }

  return data;
};

export interface ConfirmSubscriptionParams {
  subscriptionId: string;
  paymentMethodId: string;
}

export const confirmSubscription = async (
  params: ConfirmSubscriptionParams
): Promise<any> => {
  const response = await fetch(`${API_URL}/confirm-subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to confirm subscription');
  }

  return data;
};

export interface CreateSubscriptionParams {
  amount: number;
  currency: string;
  confirmationTokenId: string;
  customerId: string;
  productName: string;
}

export interface CreateSubscriptionResponse {
  subscriptionId: string;
  clientSecret: string;
  status: string;
  currentPeriodEnd: number;
}

export const createSubscription = async (
  params: CreateSubscriptionParams
): Promise<CreateSubscriptionResponse> => {
  const response = await fetch(`${API_URL}/create-subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to create subscription');
  }

  return data;
};

export const getSubscription = async (subscriptionId: string): Promise<any> => {
  const response = await fetch(`${API_URL}/subscription/${subscriptionId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch subscription');
  }

  return data;
};

export const cancelSubscription = async (subscriptionId: string): Promise<any> => {
  const response = await fetch(`${API_URL}/cancel-subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subscriptionId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to cancel subscription');
  }

  return data;
};
