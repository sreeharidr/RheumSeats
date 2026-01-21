export interface Institute {
  id: number;
  name: string;
  city: string;
  course: string;
  seats: string | number;
}

export type InstituteFormData = Omit<Institute, 'id'>;