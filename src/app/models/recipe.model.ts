export interface Recipe {
  id?: number;
  title: string;
  description: string;
  name?: string;
  ingredients?: string[];
  instructions?: string[];
  imageUrl?: string;
}