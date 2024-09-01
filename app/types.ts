export type Currency = {
  id: number;
  name: string;
  symbol: string;
}
  
export type Crypto = Currency & {
  quote: {
    USD: {
      price: number;
    }
  }
}

export type Status = {
  error_code: number | null;
  error_message: string | null;
}

export type Response = {
  data: [Currency | Crypto];
  status: Status;
}
