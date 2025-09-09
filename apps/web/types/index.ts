export interface Document {
  id: string;
  title: string;
  type: string;
  patientName: string;
  date: string;
  status: string;
  size: string;
}

export interface DocumentFilters {
  search: string;
  type: string;
  status: string;
  dateRange: string;
  patient: string;
}

export interface FilterComponentProps {
  value: string;
  onChange: (value: string) => void;
}
