<script lang="ts">
  import { Logotype, Menu, ThemeToggle } from "@/components/ui";
</script>

<header class="fixed w-full">
  <div class="base-container grid grid-cols-[1fr_auto_1fr] items-center">
    <Logotype />
    <Menu />
    <ThemeToggle />
  </div>
</header>

<style>
  header {
    height: clamp(2.5rem, calc(2.5rem + ((1vw - 0.2rem) * 4.6429)), 5.75rem);
  }
</style>