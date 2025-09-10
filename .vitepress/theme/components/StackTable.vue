<script setup>
const props = defineProps({
  repos: { type: Array, required: true },
  style: { type: String, default: 'flat' },
})

function getLink(type, repo) {
  const links = {
    stars: `https://img.shields.io/github/stars/${repo}?style=${props.style}&label=%20&color=forestgreen`,
    forks: `https://img.shields.io/github/forks/${repo}?style=${props.style}&label=%20&color=blue`,
    last: `https://img.shields.io/github/last-commit/${repo}?display_timestamp=committer&style=${props.style}&label=%20`,
    language: `https://img.shields.io/github/languages/top/${repo}?style=${props.style}`,
  }
  return links[type]
}
</script>

<template>
  <table class="stack-table">
    <thead>
      <tr>
        <th>Repositories - {{ props.repos.length }}</th>
        <th class="center" style="padding: 0">⭐🍴</th>
        <th class="center">Updated</th>
        <th>Language</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="repo in props.repos" :key="repo">
        <td class="repository">
          <a :href="`https://github.com/${repo}`" :title="repo" target="_blank" rel="noopener">{{ repo }}</a>
        </td>
        <td class="center">
          <a :href="`https://github.com/${repo}/stargazers`" target="_blank" rel="noopener">
            <img alt="S" :src="getLink('stars', repo)" style="margin-right: 4px"
          /></a>
          <a :href="`https://github.com/${repo}/forks`" target="_blank" rel="noopener">
            <img alt="F" :src="getLink('forks', repo)"
          /></a>
        </td>
        <td class="center">
          <a :href="`https://github.com/${repo}/pulse`" target="_blank" rel="noopener">
            <img alt="Updated" :src="getLink('last', repo)"
          /></a>
        </td>
        <td>
          <a :href="`https://github.com/${repo}/network/dependents`" target="_blank" rel="noopener">
            <img alt="Language" :src="getLink('language', repo)" />
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.stack-table td.repository {
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}
@media (min-width: 540px) {
  .stack-table td.repository {
    max-width: 200px;
  }
}
@media (min-width: 721px) {
  .stack-table td.repository {
    max-width: 260px;
  }
}
@media (min-width: 1066px) {
  .stack-table td.repository {
    max-width: 310px;
  }
}

.stack-table td {
  padding: 4px;
}
.stack-table img {
  height: auto;
  width: auto;
  max-width: none;
  max-height: none;
  margin-right: 0;
  vertical-align: middle;
}
.stack-table .center {
  text-align: center;
  text-wrap: nowrap;
}
</style>
