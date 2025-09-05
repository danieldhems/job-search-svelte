<script lang="ts">
  import type { PageProps } from "./@types";
  let { data }: PageProps = $props();

  const agents = data.agents;
</script>

{#each agents as { 
  first_name, 
  last_name, 
  email, 
  phone_number, 
  mobile_number, 
  company
}}
  <li>
    <h2>{first_name} {last_name}</h2>
  </li>
{/each}