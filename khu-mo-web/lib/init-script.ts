/** Wrapper around the page content; made inert while the age gate is open. */
export const SITE_ROOT_ID = "site-root";

export const STORAGE_KEYS = {
  theme: "khu-mo:theme",
  ageVerified: "khu-mo:age-verified",
  cookieConsent: "khu-mo:cookie-consent",
} as const;

/**
 * Inlined in <head> so the stored theme and age confirmation apply before first paint
 * (no theme flash, and returning visitors never see the age gate flicker).
 */
export const initScript = `try{var d=document.documentElement;if(localStorage.getItem("${STORAGE_KEYS.theme}")==="dark"){d.dataset.theme="dark"}if(localStorage.getItem("${STORAGE_KEYS.ageVerified}")==="1"){d.dataset.ageOk=""}}catch(e){}`;
