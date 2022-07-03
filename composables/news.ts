interface INewsArticle {
    title: string;
    day: number;
    text: string;
}

export const useNewsArticles = () => useState<INewsArticle[]>("newsArticles", () => []);
export const useIsNewspaperOpen = () => useState("isNewspaperOpen", () => false);
export const addNewsArticle = (article: Omit<INewsArticle, "day">) => {
    const newsArticles = useNewsArticles();
    const day = usePlayer().value.days;
    newsArticles.value.unshift({
        ...article,
        day,
    });
    const overlay = useOverlayState();
    overlay.value.newsOpenBox.isPulsing = true;
};