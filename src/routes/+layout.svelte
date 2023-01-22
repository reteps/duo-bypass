<script lang="ts">
  import "$lib/styles/app.css";
	import Header from "$lib/components/Header.svelte"
</script>
<main class="flex container mx-auto flex-col">
  <Header />
  <slot />
</main>