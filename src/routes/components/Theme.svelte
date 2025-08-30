<script lang="ts">
  import { onMount } from "svelte";
  import { initializeTheme } from "$lib/theme";

  onMount(() => {
    initializeTheme();
  });
</script>

<!-- This component is used to initialize the theme system globally -->
