<script lang="ts">
  import type { Snippet } from "svelte";

  type Variant = "primary" | "secondary";

  let {
    variant = "primary",
    disabled = false,
    type = "button" as "button" | "submit" | "reset",
    class: className = "",
    text = "Button Text",
    children,
  }: {
    variant?: Variant;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    class?: string;
    text?: string;
    children?: Snippet;
  } = $props();

  const base =
    "inline-flex items-center justify-center font-semibold rounded-sm px-5 py-2.5 transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed";

  const variants: Record<Variant, string> = {
    primary:
      "bg-primary text-white hover:bg-primary-hover active:scale-[0.96] active:bg-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:bg-primary/40 disabled:text-white/70",
    secondary:
      "border border-foreground/20 text-foreground hover:bg-foreground/10 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground/20 disabled:opacity-50 disabled:hover:bg-transparent",
  };
</script>

<button type={type} disabled={disabled} class={`${base} ${variants[variant]} ${className}`}>
  {#if children}
    {@render children()}
  {:else}
    {text}
  {/if}
</button>