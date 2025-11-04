<script lang="ts">
  import { onMount } from "svelte";

  export let color = "bg-muted";
  export let duration = 1000; // миллисекунды
  export let direction: "top" | "bottom" = "top"; // 🔹 новое свойство

  let el: HTMLDivElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.setProperty("--duration", `${duration}ms`);
            el.classList.add("animate-line-grow");
          } else {
            el.classList.remove("animate-line-grow");
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<div
  bind:this={el}
  class={`line-vertical ${color}`}
  data-direction={direction}
></div>

<style>
  .line-vertical {
    width: 1px;
    height: 100%;
    opacity: 0;
    transform-origin: var(--origin, top);
  }

  /* 🔹 Анимация */
  @keyframes line-grow {
    from {
      transform: scaleY(0);
      opacity: 0;
    }
    to {
      transform: scaleY(1);
      opacity: 1;
    }
  }

  .animate-line-grow {
    animation: line-grow var(--duration, 1s) ease-out forwards;
  }

  /* 🔹 Переменная для направления */
  .line-vertical[data-direction="top"] {
    --origin: top;
  }

  .line-vertical[data-direction="bottom"] {
    --origin: bottom;
  }
</style>