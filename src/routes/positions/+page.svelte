<script lang="ts">
  import type { PageProps } from "./@types";
  let { data }: PageProps = $props();

  console.log("positions data", data);
  const positions = data.positions;
</script>

{#each positions as { 
  job_title,
  job_type,
  job_description,
  client,
  salary   
}}
  <li>
    <h2>{job_title}</h2>
  </li>
{/each}