export interface Debt {
  Address: string;
  Date: string;
  DocumentType: string;
  Id: number;
  NIP: string;
  Name: string;
  Number: string;
  Price: number;
  Value: number;
}

export interface ColumnSort {
    column: keyof Debt;
    direction: 'asc' | 'desc';
}
