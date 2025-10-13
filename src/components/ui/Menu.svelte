<script lang="ts">
  import { Link } from "@/components/ui";
</script>

<nav aria-label="Основная навигация сайта">
  <ul class="glass rounded-full py-2 px-5 flex gap-0.5 uppercase">
    <li>
      <Link href="/services" variant="navlink" text="Услуги" />
    </li>
    <li>
      <Link href="/cases" variant="navlink" text="Кейсы" />
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