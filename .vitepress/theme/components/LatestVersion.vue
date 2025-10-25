<script setup>
// noinspection NpmUsedModulesInstalled
import { ref } from 'vue'
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue'

const props = defineProps({
  repo: { type: String, required: true },
})
const href = `https://github.com/${props.repo}/releases/latest`
const src = `https://img.shields.io/github/v/release/${props.repo}?style=for-the-badge&logo=github&label=latest%20version`

const btnTheme = ref('brand')
const shaOutput = ref(null)
const myButton = ref(null)

function handleOutputClick(event) {
  if (event.target.value) {
    event.target.select()
    navigator.clipboard.writeText(event.target.value)
  }
}

async function generateHash(event) {
  console.log('event:', event)
  console.log('myButton:', myButton)
  const el = myButton.value?.$el
  console.log('el:', el)
  if (!el) return console.error('Unable to access button element.')
  el.disabled = true
  btnTheme.value = 'alt'
  const release = await fetchData(`https://api.github.com/repos/${props.repo}/releases/latest`)
  console.log('release:', release)
  if (!release) return console.error('Unable to fetch latest release.')
  console.log('release.tag_name:', release.tag_name)
  const tag = await fetchData(`https://api.github.com/repos/${props.repo}/git/ref/tags/${release.tag_name}`)
  console.log('tag:', tag)
  if (!tag?.object?.sha) return console.error('Unable to fetch tag/sha.')
  console.log('tag.object.sha:', tag.object.sha)
  shaOutput.value = tag.object.sha
  await navigator.clipboard.writeText(tag.object.sha)
}

/**
 * Fetch Data
 * @param {String} url
 * @return {Promise<Object>}
 */
async function fetchData(url) {
  const options = { headers: { 'X-GitHub-Api-Version': '2022-11-28' } }
  const response = await fetch(url, options)
  console.log('response.status:', response.status)
  if (!response.ok) return
  return await response.json()
}
</script>

<template>
  <div id="buttons">
    <VPButton text="Generate Commit Hash" @click="generateHash" :theme="btnTheme" ref="myButton" />
    <div>
      <a :href="href" target="_blank" rel="noopener">
        <img alt="GitHub Release" :src="src" />
      </a>
    </div>
  </div>
  <div :style="{ display: shaOutput ? 'block' : 'none' }">
    <input
      id="encodeOutput"
      placeholder="Encoded Results"
      v-model="shaOutput"
      type="text"
      @click="handleOutputClick"
      readonly
    />
    <p>Hash Copied to Clipboard</p>
  </div>
</template>

<style scoped>
#buttons > * {
  margin-bottom: 0.5rem;
}

@media (min-width: 640px) {
  #buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
img {
  display: inline-block;
}
input {
  border: 1px solid var(--vp-c-gray-1);
  border-radius: 8px;
  padding: 6px;
  width: 100%;
}
p {
  color: var(--vp-c-success-1);
  margin: 0 0 8px 8px;
  font-weight: 300;
}
</style>
