<script>
  import {
    Alert,
    Card,
    Button,
    Textarea,
    Spinner,
    P,
    Toast,
  } from "flowbite-svelte";
  import { DateInput } from "date-picker-svelte";
  import { onMount } from "svelte";

  import TimeLineComponent from "./components/Timeline.svelte";
  import FloatButton from "./components/FloatButton.svelte";
  import EmojiStatus from "./components/EmojiStatus.svelte";

  const { VITE_API_URL, VITE_RECAPTCHA_KEY } = import.meta.env;
  let text;
  let loading = false;
  let responses = [];
  let date = new Date();
  let today = new Date();
  let userStatus = { happiness: 0, sadness: 0 };
  let apiError = false;

  $: {
    userStatus = calculateUserStatus(responses);
  }

  const onSubmit = async () => {
    try {
      loading = true;
      const response = await fetch(`${VITE_API_URL || ""}/post`, {
        method: "POST",
        body: JSON.stringify({
          text,
          userPreferences: addKnowToApp(),
          "g-recaptcha-response": await doRecaptcha(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("WARN", response?.status);
      const data = await response.json();

      responses = [
        { text, result: data, date: date.toISOString() },
        ...responses,
      ];

      localStorage.setItem("userData", JSON.stringify(responses));
      text = "";
      return data;
    } catch (error) {
      console.log(error);
      apiError = true;
      setTimeout(() => (apiError = false), 5000);
    } finally {
      loading = false;
    }
  };

  const addKnowToApp = () =>
    responses.map((userResponse) => ({
      text: userResponse?.text,
      label: userResponse?.result?.result,
    }));

  const clearUserData = () => {
    localStorage.removeItem("userData");
    responses = [];
  };

  const calculateUserStatus = (responses) => {
    if (responses.length === 0) return;
    let happinessCounter = 0;
    let happinessAcumulator = 0;
    let sadnessCounter = 0;
    let sadnessAcumulator = 0;
    let totalCounter = 0;

    try {
      responses.forEach((response) => {
        totalCounter += 1;
        if (response?.result?.result === "negative") {
          sadnessCounter++;
          sadnessAcumulator += response?.result?.confidence;
        } else {
          happinessCounter++;
          happinessAcumulator += response?.result?.confidence;
        }
      });

      return {
        happiness: (happinessAcumulator / totalCounter) * 100,
        sadness:
          sadnessCounter > 0 ? (sadnessAcumulator / totalCounter) * 100 : 0,
      };
    } catch (error) {
      console.log(error);
    }
  };

  onMount(async () => {
    try {
      let userData = localStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        responses = userData || [];
      } else {
        localStorage.userData = JSON.stringify([]);
      }
    } catch (error) {
      console.log("Error on load user data");
    }
  });

  const changeResponse = (e) => {
    const index = e.detail.index;
    if (responses[index].result?.result === "negative") {
      responses[index].result.result = "positive";
    } else {
      responses[index].result.result = "negative";
    }
    localStorage.setItem("userData", JSON.stringify(responses));
  };

  const doRecaptcha = async () => {
    return new Promise((resolve, reject) => {
      grecaptcha.ready(() =>
        grecaptcha
          .execute(VITE_RECAPTCHA_KEY, { action: "submit" })
          .then(function (t) {
            resolve(t);
          })
          .catch((err) => reject(err))
      );
    });
  };
</script>

<div class="containerMain">
  <Card rounded class="md:min-w-[55%]">
    <div class="flex justify-center flex-col">
      <div class="text-7xl">????</div>
    </div>
    <div class="mb-4 mt-8">
      <Alert>
        <P size="base">Hello! Welcome to LifeLog AI</P>
        <P size="sm"
          >LifeLog AI is a personal diary application that uses artificial
          intelligence to help you keep track of your thoughts, feelings, and
          emotions. The app will help you detect if your day has been good or
          bad and better understand how you're feeling. With LifeLog AI, you'll
          be able to track your emotions and progress towards a more balanced
          and happy life.</P
        >
      </Alert>
    </div>
    <EmojiStatus {userStatus} />
    <div class="mb-5 flex justify-start items-center">
      <P class="mr-3">Date:</P>
      <DateInput bind:value={date} format="dd-MM-yyyy" max={today} />
    </div>
    <div class="mb-5">
      <Textarea
        placeholder="Write a brief description of your day..."
        bind:value={text}
        disabled={loading}
        rows="4"
        style="resize: none;"
      />
    </div>
    <Button
      type="submit"
      class="w-full"
      on:click={onSubmit}
      disabled={loading || text?.length < 10}
    >
      {#if loading}<Spinner class="mr-3" size="4" color="white" />{/if}
      Send
    </Button>
  </Card>
  <TimeLineComponent {responses} on:changeResponse={changeResponse} />
  <FloatButton on:reset={clearUserData} />
  <Toast position="top-right" bind:open={apiError} color="red"
    ><svelte:fragment slot="icon">
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        /></svg
      >
      <span class="sr-only">Warning icon</span>
    </svelte:fragment>An error has occurred. Try again</Toast
  >
  <script
    src="https://www.google.com/recaptcha/api.js?render={VITE_RECAPTCHA_KEY}"
    async
    defer
  ></script>
</div>

<style>
  .containerMain {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    align-items: center;
  }
</style>
