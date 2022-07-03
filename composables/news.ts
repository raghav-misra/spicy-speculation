interface INewsArticle {
    title: string;
    day: number;
}

export const useNewsArticles = () => useState<INewsArticle[]>("newsArticles", () => []);
export const useIsNewspaperOpen = () => useState("isNewspaperOpen", () => false);
export const addNewsArticle = (title: string) => {
    const newsArticles = useNewsArticles();
    const day = usePlayer().value.days;
    newsArticles.value.unshift({
        title,
        day,
    });
    const overlay = useOverlayState();
    overlay.value.newsOpenBox.isPulsing = true;
};