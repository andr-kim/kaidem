<script lang="ts">
  import type { Snippet } from "svelte";
  import arrowRightUp from "@/assets/icons/arrow-right-up.svg";

  type Variant = "primary" | "secondary";
  type IconPosition = "left" | "right" | "none";

  let {
    variant = "primary",
    disabled = false,
    type = "button" as "button" | "submit" | "reset",
    class: className = "",
    text = "Button Text",
    icon = "none" as IconPosition,
    showIcon = false,
    children,
  }: {
    variant?: Variant;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    class?: string;
    text?: string;
    icon?: IconPosition;
    showIcon?: boolean;
    children?: Snippet;
  } = $props();

  const base =
    "inline-flex items-center justify-center font-semibold rounded-sm px-6 py-4 transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed";

  const variants: Record<Variant, string> = {
    primary:
      "bg-primary text-white text-center hover:bg-primary-hover active:scale-[0.96] active:bg-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:bg-primary/40 disabled:text-white/70",
    secondary:
      "border border-foreground/20 text-foreground hover:bg-foreground/10 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground/20 disabled:opacity-50 disabled:hover:bg-transparent",
  };
</script>

<button
  type={type}
  disabled={disabled}
  class={`${base} ${variants[variant]} ${className}`}
>
  {#if icon === "left" && showIcon}
    <img src={arrowRightUp.src} alt="" class="w-3 h-3 mr-2" />
  {/if}

  {#if children}
    {@render children()}
  {:else}
    {text}
  {/if}

  {#if icon === "right" && showIcon}
    <img src={arrowRightUp.src} alt="" class="w-3 h-3 ml-2" />
  {/if}
</button>