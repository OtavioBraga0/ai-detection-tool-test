export interface IHomeContent {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Title: {
    id: number;
    text: string;
  };
  Paragraph: {
    id: number;
    content: string;
  };
  Button: {
    id: number;
    text: string;
  };
}
