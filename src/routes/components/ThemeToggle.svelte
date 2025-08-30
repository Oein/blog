<script lang="ts">
  import { currentTheme, toggleTheme } from "$lib/theme";

  // Subscribe to theme changes
  $: isDark = $currentTheme === "dark";
</script>

<button
  class="theme-toggle"
  on:click={toggleTheme}
  aria-label="Toggle theme"
  title={isDark ? "Switch to light theme" : "Switch to dark theme"}
>
  {#if isDark}
    <!-- Sun icon for light theme -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 18q-2.5 0-4.25-1.75T6 12t1.75-4.25T12 6t4.25 1.75T18 12t-1.75 4.25T12 18M12 8q-1.65 0-2.825 1.175T8 12t1.175 2.825T12 16t2.825-1.175T16 12t-1.175-2.825T12 8M1 13v-2h3v2zm19 0v-2h3v2zM11 1h2v3h-2zm0 19h2v3h-2zM6.05 7.05L7.464 5.636L9.586 7.757L8.172 9.172zm11.314 11.314l1.414-1.414l2.122 2.121l-1.414 1.414zM16.243 6.343l2.121-2.121l1.414 1.414L17.657 7.757zm-8.486 8.485l-2.121 2.122l-1.414-1.414l2.121-2.122z"
      />
    </svg>
  {:else}
    <!-- Moon icon for dark theme -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 21q-3.75 0-6.375-2.625T3 12t2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.538-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21"
      />
    </svg>
  {/if}
</button>

<style>
  .theme-toggle {
    background: transparent;
    border: none;
    color: var(--color-accent-1);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    z-index: 0;
  }

  .theme-toggle::before {
    background: var(--color-accent-1-hover);
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 0.5rem;
    opacity: 0;
    scale: 0;
    transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .theme-toggle:hover::before {
    opacity: 1;
    scale: 1;
  }

  .theme-toggle:focus {
    outline: 2px solid var(--color-accent-1);
    outline-offset: 2px;
  }
</style>
