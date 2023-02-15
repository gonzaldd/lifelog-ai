<script>
  import { Card, P, Timeline, TimelineItem } from "flowbite-svelte";
  import StatusText from "./StatusText.svelte";

  export let responses;
</script>

{#if responses?.length > 0}
  <Card rounded class="mt-5 text-left md:min-w-[55%] w-full">
    <Timeline>
      {#await responses then}
        {#each responses as response, index}
          <TimelineItem date={new Date(response?.date).toDateString()}>
            <P
              class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
            >
              {response?.text}
            </P>
            <StatusText {response} {index} on:changeResponse />
          </TimelineItem>
        {/each}
      {/await}
    </Timeline>
  </Card>
{/if}
