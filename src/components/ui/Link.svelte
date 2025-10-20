<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  interface Props extends HTMLAnchorAttributes {
    variant?: "link" | "navlink" | "button";
    href: string;
    class?: string;
    text?: string;
    external?: boolean;
    children?: Snippet;
  }

  let {
    variant = "link",
    href,
    class: className = "",
    text = "Link Text",
    external = false,
    children,
    ...rest
  }: Props = $props();

  const target = external ? "_blank" : undefined;
  const rel = external ? "noopener noreferrer" : undefined;

  const base =
    "font-semibold tracking-wider inline-flex items-center transition-colors duration-200 focus-visible:outline-none";

  const variants: Record<NonNullable<Props["variant"]>, string> = {
    link: "py-2 text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline",
    navlink:
      "text-foreground hover:text-primary data-[active=true]:text-primary",
    button:
      "px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 active:scale-[0.98]",
  };

  let isActive = $state(false);

  $effect(() => {
    if (typeof window !== "undefined") {
      isActive = window.location.pathname === href;
    }
  });
</script>

<a
  href={href}
  target={target}
  rel={rel}
  class={`${base} ${variants[variant]} ${className}`}
  aria-current={isActive ? "page" : undefined}
  data-active={isActive}
  {...rest}
>
  {#if children}
    {@render children()}
  {:else}
    {text}
  {/if}
</a>