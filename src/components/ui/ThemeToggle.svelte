<script lang="ts">
  import { onMount } from "svelte";

  type Theme = "light" | "dark" | "auto";

  let currentTheme: Theme = "auto";
  let prefersDark: MediaQueryList;
  let nextLabel = "🌙";

  // Этот код выполнится только в браузере
  onMount(() => {
    prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    // 1️⃣ Загружаем текущую тему
    const stored = (localStorage.getItem("theme") as Theme | null) || "auto";
    currentTheme = stored;

    applyTheme();

    // 2️⃣ Реакция на системные изменения в авто-режиме
    prefersDark.addEventListener("change", () => {
      if (currentTheme === "auto") applyTheme();
    });
  });

  function isDarkMode(): boolean {
    if (currentTheme === "dark") return true;
    if (currentTheme === "light") return false;
    return prefersDark.matches;
  }

  function applyTheme() {
    document.documentElement.classList.toggle("dark", isDarkMode());
    updateLabel();
  }

  function setTheme(theme: Theme) {
    currentTheme = theme;
    if (theme === "auto") localStorage.removeItem("theme");
    else localStorage.setItem("theme", theme);
    applyTheme();
  }

  function toggleTheme() {
    if (currentTheme === "light") setTheme("dark");
    else if (currentTheme === "dark") setTheme("auto");
    else setTheme("light");
  }

  function updateLabel() {
    nextLabel =
      currentTheme === "light"
        ? "🌙"
        : currentTheme === "dark"
        ? "🖥"
        : "☀️";
  }
</script>

<button
  on:click={toggleTheme}
  class="justify-self-end w-fit p-2 rounded-full bg-primary text-white transition-colors duration-300 hover:opacity-90"
>
  {nextLabel}
</button>