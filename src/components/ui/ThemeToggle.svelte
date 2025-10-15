<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  type Theme = "light" | "dark" | "auto";

  let currentTheme: Theme = "auto";
  let prefersDark: MediaQueryList;
  let menuOpen = false;
  let container: HTMLDivElement;
  let closeTimer: number | null = null;

  onMount(() => {
    prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const stored = (localStorage.getItem("theme") as Theme | null) || "auto";
    currentTheme = stored;
    applyTheme();

    prefersDark.addEventListener("change", () => {
      if (currentTheme === "auto") applyTheme();
    });

    // ✅ закрываем меню при клике вне блока
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuOpen && container && !container.contains(event.target as Node)) {
        menuOpen = false;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    onDestroy(() => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    });
  });

  function isDarkMode(): boolean {
    if (currentTheme === "dark") return true;
    if (currentTheme === "light") return false;
    return prefersDark.matches;
  }

  function applyTheme() {
    document.documentElement.classList.toggle("dark", isDarkMode());
  }

  function setTheme(theme: Theme) {
    currentTheme = theme;
    if (theme === "auto") localStorage.removeItem("theme");
    else localStorage.setItem("theme", theme);
    applyTheme();
    menuOpen = false;
  }

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function handleMouseEnter() {
    if (window.innerWidth >= 1024) {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      menuOpen = true;
    }
  }

  function handleMouseLeave() {
    if (window.innerWidth >= 1024) {
      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => {
        menuOpen = false;
        closeTimer = null;
      }, 120);
    }
  }
</script>

<!-- 🔹 Весь блок с ref для кликов вне -->
<div
  bind:this={container}
  class="relative justify-self-end"
  role="button"
  tabindex="0"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <button
    on:click={toggleMenu}
    class="h-11 w-11 flex items-center justify-center rounded-full glass text-muted-foreground transition-colors duration-300 hover:text-foreground"
    aria-haspopup="menu"
    aria-expanded={menuOpen}
    aria-label="Toggle theme menu"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
      <path fill="currentColor" d="M10 3a7 7 0 1 1 0 14zm0-1a8 8 0 1 0 0 16a8 8 0 0 0 0-16" />
    </svg>
  </button>

  {#if menuOpen}
    <div
      class="absolute right-0 top-full translate-y-2 w-28 rounded-lg glass text-sm text-white backdrop-blur-lg shadow-lg z-10"
      role="menu"
      tabindex="0"
      aria-label="Theme selection"
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
    >
      <button
        class="w-full px-3 py-2 text-left hover:bg-white/10 rounded-t-lg transition-colors"
        on:click={() => setTheme('light')}
        role="menuitem"
      >
        ☀️ День
      </button>
      <button
        class="w-full px-3 py-2 text-left hover:bg-white/10 transition-colors"
        on:click={() => setTheme('dark')}
        role="menuitem"
      >
        🌙 Ночь
      </button>
      <button
        class="w-full px-3 py-2 text-left hover:bg-white/10 rounded-b-lg transition-colors"
        on:click={() => setTheme('auto')}
        role="menuitem"
      >
        🖥 Авто
      </button>
    </div>
  {/if}
</div>