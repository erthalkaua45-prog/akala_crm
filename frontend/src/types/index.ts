interface CustomerEvaluation {
  score: number;
  comment: string;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  whatsapp: string;
  status: boolean;
  tags: string[];
  total_orders: number;
  total_visits: number;
  average_ticket: number;
  consumption: number;
  last_order_date: string;
  first_order_date: { $date: string };
  customer_since: { $date: string };
  first_visit_date: { $date: string };
  last_visit_date: { $date: string };
  evaluation: CustomerEvaluation;
  male: boolean;
  origin: string;
  lead_score: number;
  created_at: { $date: string };
  insight?: string;
  last_insight_date?: Date;
  
  __v: number;
}