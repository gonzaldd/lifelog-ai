<script>
  import { createEventDispatcher } from "svelte";
  import { SpeedDial, SpeedDialButton } from "flowbite-svelte";

  const moveToTop = () => window?.scrollTo({ top: 0, behavior: "smooth" });

  const dispatch = createEventDispatcher();
  const reset = () => dispatch("reset");
</script>

<SpeedDial defaultClass="fixed right-6 bottom-6">
  <svg
    slot="icon"
    aria-hidden="true"
    class="w-8 h-8"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    ><path
      d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
    /></svg
  >
  <SpeedDialButton name="Reset" on:click={reset}>
    <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"
      ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      /><g id="SVGRepo_iconCarrier">
        <path
          d="M4.56189 13.5L4.14285 13.9294L4.5724 14.3486L4.99144 13.9189L4.56189 13.5ZM9.92427 15.9243L15.9243 9.92427L15.0757 9.07574L9.07574 15.0757L9.92427 15.9243ZM9.07574 9.92426L15.0757 15.9243L15.9243 15.0757L9.92426 9.07574L9.07574 9.92426ZM19.9 12.5C19.9 16.5869 16.5869 19.9 12.5 19.9V21.1C17.2496 21.1 21.1 17.2496 21.1 12.5H19.9ZM5.1 12.5C5.1 8.41309 8.41309 5.1 12.5 5.1V3.9C7.75035 3.9 3.9 7.75035 3.9 12.5H5.1ZM12.5 5.1C16.5869 5.1 19.9 8.41309 19.9 12.5H21.1C21.1 7.75035 17.2496 3.9 12.5 3.9V5.1ZM5.15728 13.4258C5.1195 13.1227 5.1 12.8138 5.1 12.5H3.9C3.9 12.8635 3.92259 13.2221 3.9665 13.5742L5.15728 13.4258ZM12.5 19.9C9.9571 19.9 7.71347 18.6179 6.38048 16.6621L5.38888 17.3379C6.93584 19.6076 9.54355 21.1 12.5 21.1V19.9ZM4.99144 13.9189L7.42955 11.4189L6.57045 10.5811L4.13235 13.0811L4.99144 13.9189ZM4.98094 13.0706L2.41905 10.5706L1.58095 11.4294L4.14285 13.9294L4.98094 13.0706Z"
          fill="currentColor"
        />
      </g></svg
    >
  </SpeedDialButton>
  <SpeedDialButton name="To top" on:click={moveToTop}>
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      /><g id="SVGRepo_iconCarrier">
        <path
          d="M13,5.70710678 L13,16.5 C13,16.7761424 12.7761424,17 12.5,17 C12.2238576,17 12,16.7761424 12,16.5 L12,5.70710678 L8.85355339,8.85355339 C8.65829124,9.04881554 8.34170876,9.04881554 8.14644661,8.85355339 C7.95118446,8.65829124 7.95118446,8.34170876 8.14644661,8.14644661 L12.1464466,4.14644661 C12.3417088,3.95118446 12.6582912,3.95118446 12.8535534,4.14644661 L16.8535534,8.14644661 C17.0488155,8.34170876 17.0488155,8.65829124 16.8535534,8.85355339 C16.6582912,9.04881554 16.3417088,9.04881554 16.1464466,8.85355339 L13,5.70710678 Z M4.5,20 C4.22385763,20 4,19.7761424 4,19.5 C4,19.2238576 4.22385763,19 4.5,19 L20.5,19 C20.7761424,19 21,19.2238576 21,19.5 C21,19.7761424 20.7761424,20 20.5,20 L4.5,20 Z"
        />
      </g></svg
    >
  </SpeedDialButton>
</SpeedDial>
