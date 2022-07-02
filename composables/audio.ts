import { Howl } from "howler";

export const audio = {
    bg: new Howl({
        src:"/audio/bg.webm",
        loop: true,
        volume: 0.1
    }),
    openShop: new Howl({
        src:"/audio/open_shop.webm",
    }),
    close: new Howl({
        src:"/audio/close_shop.webm",
    }),
    purchase: new Howl({
        src:"/audio/purchase.webm",
        volume: 0.1
    }),
    waves: new Howl({
        src:"/audio/waves.webm",
        loop: true
    }),
    openNews: new Howl({
        src:"/audio/open_news.webm",
    }),
    next: new Howl({
        src:"/audio/next.webm",
        volume: 0.5
    }),

}