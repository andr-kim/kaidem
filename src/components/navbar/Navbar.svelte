<script lang="ts">
  import { Logotype, Menu, ThemeToggle } from "@/components/ui";
</script>

<header class="fixed w-full">
  <div class="base-container grid grid-cols-[1fr_auto_1fr] items-center max-xl:grid-cols-[1fr_1fr]">
    <Logotype />
    <Menu />
    <ThemeToggle />
  </div>
</header>

<style>
  header {
    height: clamp(3.25rem, calc(3.25rem + ((1vw - 0.2rem) * 3.9286)), 6rem);
  }
</style>