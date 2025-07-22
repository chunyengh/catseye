<script lang="ts">
  import Toast from "./Toast.svelte";
  import type { MyToast } from './SearchType';
  import { dismissToast, toasts } from "./store.js";
</script>

{#if $toasts}
  <section>
    {#each $toasts as toast ((toast as MyToast).id)}
      <Toast
        type={(toast as MyToast).type}
        dismissible={(toast as MyToast).dismissible}
        on:dismiss={() => dismissToast((toast as MyToast).id)}>{(toast as MyToast).message}</Toast
      >
    {/each}
  </section>
{/if}

<style lang="postcss">
  section {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    margin-top: 1rem;
    justify-content: center;
    flex-direction: column;
    z-index: 1000;
  }
</style>
