<script lang="ts">
  import { Menu, Logotype, Descriptor, ThemeToggle } from "@/components/ui";
</script>

<header class="fixed w-full">
  <div class="base-container grid grid-cols-[1fr_auto_1fr] py-6 gap-3">
    <Menu />
    <Logotype />
    <div class="flex justify-between">
      <Descriptor />
      <ThemeToggle />
    </div>
  </div>
</header>