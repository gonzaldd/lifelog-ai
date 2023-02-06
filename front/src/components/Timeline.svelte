<script>
  import { Card, P, Timeline, TimelineItem } from "flowbite-svelte";

  export let responses;
</script>

{#if responses?.length > 0}
  <Card rounded class="mt-5 text-left md:min-w-[55%] w-full">
    <Timeline>
      {#await responses then}
        {#each responses as response}
          <TimelineItem date={new Date(response?.date).toDateString()}>
            <p
              class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
            >
              {response?.text}
            </p>
            <P
              color={response?.result?.result === "negative"
                ? "text-red-700"
                : "text-green-700"}
              >{response?.result?.result}
              {Math.trunc(response?.result?.confidence * 100)}%</P
            >
          </TimelineItem>
        {/each}
      {/await}
    </Timeline>
  </Card>
{/if}
