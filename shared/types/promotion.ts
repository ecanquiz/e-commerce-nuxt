export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  type: 'discount' | 'free-shipping' | 'special-offer';
}
