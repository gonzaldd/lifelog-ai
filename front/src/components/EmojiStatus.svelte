<script>
  import { Progressbar } from "flowbite-svelte";

  export let userStatus;
</script>

<div class="pb-10">
  {#if userStatus?.happiness}
    <div class="text-4xl flex flex-row items-center">
      😊
      <Progressbar progress={userStatus?.happiness} color="green" />
    </div>
  {/if}
  {#if userStatus?.sadness}
    <div class="text-4xl flex flex-row items-center pt-3">
      😕
      <Progressbar progress={userStatus?.sadness} color="red" />
    </div>
  {/if}
</div>
