interface INewsArticle {
    title: string;
    day: number;
    text: string;
}

export const useNewsArticles = () => useState<INewsArticle[]>("newsArticles", () => []);