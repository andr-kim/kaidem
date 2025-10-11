/**
 * Минимальный inline-скрипт из официальной Tailwind Docs.
 * Применяет тему до загрузки UI, чтобы избежать FOUC.
 */

export const themeInline = `
  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
`;
