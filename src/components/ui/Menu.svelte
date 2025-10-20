<script lang="ts">
  import { Link } from "@/components/ui";
</script>

<nav aria-label="Основная навигация сайта" class="max-xl:hidden">
  <ul class="flex flex-col gap-4">
    <li>
      <Link href="/services" variant="navlink" text="Услуги" />
    </li>
    <li>
      <Link href="/projects" variant="navlink" text="Проекты" />
    </li>
    <li>
      <Link href="/about" variant="navlink" text="Наш клан" />
    </li>
    <li>
      <Link href="/journal" variant="navlink" text="Журнал" />
    </li>
    <li>
      <Link href="/contact" variant="navlink" text="Контакты" />
    </li>
  </ul>
</nav>