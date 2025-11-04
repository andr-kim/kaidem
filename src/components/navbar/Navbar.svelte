<script lang="ts">
  import { Menu, Logotype, Lang, ThemeToggle } from "@/components/ui";
</script>

<header class="fixed w-full">
  <div class="main-container grid grid-cols-[1fr_auto_1fr] gap-10">
    <div class="flex justify-between">
      <Logotype />
      <Lang />
    </div>
    <div>
    </div>
    <div class="flex justify-between">
      <Menu />
      <ThemeToggle />
    </div>
  </div>
</header>