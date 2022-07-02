interface INewsArticle {
    title: string;
    day: number;
    text: string;
}

export const useNewsArticles = () => useState<INewsArticle[]>("newsArticles", () => []);
export const addNewsArticle = (article: Omit<INewsArticle, "day">) => {
    const newsArticles = useNewsArticles();
    newsArticles.value.unshift({
        ...article,
        day: Math.random() /* TODO: actual current day expression */
    })
};