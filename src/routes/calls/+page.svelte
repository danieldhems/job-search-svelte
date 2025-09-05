<script lang="ts">
  import type { PageProps } from "./@types";
  let { data }: PageProps = $props();

  console.log("calls data", data);
  const calls = data.calls;
</script>

{#each calls as { received_at, agent_first_name, agent_last_name }}
  <li>
    <h2>Received on: {received_at}, from {agent_first_name} {agent_last_name}</h2>
  </li>
{/each}