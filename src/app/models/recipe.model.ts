export interface Recipe {
  recipe_id?: number;
  author_id: number;
  title: string;
  description: string;
  user_name: string;
  ingredients?: string[];
  instructions?: string[];
  image_url?: Blob;
}