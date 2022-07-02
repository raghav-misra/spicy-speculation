interface INewsArticle {
    title: string;
    day: number;
    text: string;
}

export const useNewsArticles = () => useState<INewsArticle[]>("newsArticles", () => []);
export const addNewsArticle = (article: Omit<INewsArticle, "day">) => {
    const newsArticles = useNewsArticles();
    const day = usePlayer().value.days
    newsArticles.value.unshift({
        ...article,
        day:day
    })
};