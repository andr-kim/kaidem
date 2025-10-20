/**
 * Минимальный inline-скрипт из официальной Tailwind Docs.
 * Применяет тему до загрузки UI, чтобы избежать FOUC.
 */

export const themeInline = `
  document.documentElement.classList.toggle(
    'light',
    localStorage.theme === 'light' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: light)').matches)
  );
`;
