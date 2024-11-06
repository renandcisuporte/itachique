export type Category = {
  id: string;
  category: string;
  description: string;
  keywords: string;
};

export const fetchCategory = async (): Promise<Category[]> => {
  return await fetch(`${process.env.NEXT_API_URL}/api/categories`).then((res) =>
    res.json(),
  );
};
