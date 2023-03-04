<script>
  import { P } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  export let response;
  export let index;

  const dispatch = createEventDispatcher();
  const changeValue = (index) => dispatch("changeResponse", { index });

  let typeOfResponse;
  $: {
    typeOfResponse =
      response?.result?.result === "negative"
        ? "text-red-700"
        : "text-green-700";
  }
</script>

<P
  ><span class="flex flex-row {typeOfResponse}"
    >{response?.result?.result}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <svg
      class="icon"
      viewBox="0 0 25 25"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      on:click={() => changeValue(index)}
    >
      <path
        d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</P>

<style>
  .icon {
    width: 1.5em;
    height: 1.5em;
    transition: all 0.3s ease-out;
    overflow: visible;
  }
</style>
