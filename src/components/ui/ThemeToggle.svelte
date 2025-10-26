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
    const stored = (localStorage.getItem("theme") as Theme | null) || "light";
    currentTheme = stored;
    applyTheme();

    prefersDark.addEventListener("change", () => {
      if (currentTheme === "auto") applyTheme();
    });

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

<!-- 🔹 Контейнер с ref -->
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
    aria-haspopup="menu"
    aria-expanded={menuOpen}
    aria-label="Toggle theme menu"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.4286 12C23.4286 8.96894 22.2245 6.06204 20.0812 3.91876C17.9379 1.77549 15.031 0.571411 12 0.571411V23.4286C15.031 23.4286 17.9379 22.2245 20.0812 20.0812C22.2245 17.9379 23.4286 15.031 23.4286 12Z" fill="black" style="fill:black;fill-opacity:1;"/>
      <path d="M22.8571 12C22.8571 9.12051 21.7136 6.35865 19.6775 4.32254C17.7765 2.42154 15.2427 1.29918 12.5714 1.15848V22.8404C15.2427 22.6997 17.7765 21.5784 19.6775 19.6775C21.7136 17.6413 22.8571 14.8795 22.8571 12ZM1.14286 12C1.14286 14.8795 2.28644 17.6413 4.32254 19.6775C6.22354 21.5784 8.75728 22.6997 11.4286 22.8404V1.15848C8.75725 1.29918 6.22355 2.42154 4.32254 4.32254C2.28644 6.35865 1.14286 9.12051 1.14286 12ZM24 12C24 15.1826 22.7359 18.2351 20.4855 20.4855C18.2351 22.7359 15.1826 24 12 24C8.8174 24 5.76495 22.7359 3.51451 20.4855C1.26407 18.2351 0 15.1826 0 12C0 8.8174 1.26407 5.76495 3.51451 3.51451C5.76495 1.26407 8.8174 0 12 0C15.1826 0 18.2351 1.26407 20.4855 3.51451C22.7359 5.76495 24 8.8174 24 12Z" fill="black" style="fill:black;fill-opacity:1;"/>
    </svg>
  </button>

  {#if menuOpen}
    <div
      class="absolute right-0 top-full translate-y-2 w-28 rounded-lg glass text-md text-white backdrop-blur-lg shadow-lg z-10"
      role="menu"
      tabindex="0"
      aria-label="Theme selection"
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
    >
      <button
        class={`w-full px-4 py-3 text-left uppercase rounded-t-lg transition-colors ${currentTheme === 'light' ? 'bg-white/50' : 'hover:bg-white/10'}`}
        on:click={() => setTheme('light')}
        role="menuitem"
      >
        День
      </button>
      <button
        class={`w-full px-4 py-3 text-left uppercase transition-colors ${currentTheme === 'dark' ? 'bg-white/50' : 'hover:bg-white/10'}`}
        on:click={() => setTheme('dark')}
        role="menuitem"
      >
        Ночь
      </button>
      <button
        class={`w-full px-4 py-3 text-left uppercase rounded-b-lg transition-colors ${currentTheme === 'auto' ? 'bg-white/50' : 'hover:bg-white/10'}`}
        on:click={() => setTheme('auto')}
        role="menuitem"
      >
        Авто
      </button>
    </div>
  {/if}
</div>