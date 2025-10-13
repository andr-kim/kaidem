<script lang="ts">
  import { Logotype, ThemeToggle } from "@/components/ui";
</script>

<header class="fixed mx-auto w-full">
  <div class="base-container flex items-center justify-between">
    <Logotype />
    <ThemeToggle />
  </div>
</header>

<style>
  header {
    height: clamp(2.5rem, calc(2.5rem + ((1vw - 0.2rem) * 4.6429)), 5.75rem);
  }
</style>