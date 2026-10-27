export const THEME_STORAGE_KEY = "khu-mo:theme";

/** Inlined in <head> so the stored theme is applied before first paint. */
export const themeInitScript = `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark"){document.documentElement.dataset.theme="dark"}}catch(e){}`;
