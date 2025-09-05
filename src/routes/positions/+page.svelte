<script lang="ts">
  import type { PageProps } from "./@types";
  let { data }: PageProps = $props();

  console.log("positions data", data);
  const positions = data.positions;
</script>

{#each positions as { 
  title,
  job_type,
  job_description,
  client,
  salary   
}}
  <li>
    <h2>{title}</h2>
  </li>
{/each}