export type Category =
  | "All"
  | "Logo"
  | "Branding"
  | "Brochure"
  | "Packaging"
  | "Social Media"
  | "Poster"
  | "Illustration";

export interface Work {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  image: string;
  client?: string;
  year?: string;
  description?: string;
  tags?: string[];
  createdAt: number;
}
