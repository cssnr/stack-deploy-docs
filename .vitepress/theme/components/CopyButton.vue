<script setup>
// noinspection NpmUsedModulesInstalled
import { ref } from 'vue'

const props = defineProps({
  text: { type: String, default: null },
  all: { type: Boolean, default: false },
})

const copied = ref(false)

const doCopy = (text) => {
  if (!text) return console.warn('CopyButton - No Text')
  navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 1000)
}

const copyText = (event) => {
  const target = event.currentTarget
  if (copied.value) return
  if (props.text) {
    // console.log(`props.text: "${props.text}"`)
    doCopy(props.text)
  } else {
    let text
    if (props.all) {
      text = target.parentElement?.textContent?.trim()
    } else {
      text = target.parentElement?.firstChild?.textContent
      text = text?.replaceAll(/[\u200B-\u200D\uFEFF]/g, '').trim()
    }
    // console.log(`text: "${text}"`)
    doCopy(text)
  }
}
</script>

<template>
  <span @click="copyText" class="copy-button">
    <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="lucide-copy">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
    <svg v-if="copied" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="lucide-check">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  </span>
</template>

<style>
.copy-button {
  display: inline-block;
  margin-left: 6px;
  transform: translateY(-2px);
  vertical-align: middle;
}
.copy-button:hover {
  color: var(--vp-c-text-2);
  cursor: pointer;
}
.copy-button svg {
  width: 1em;
  height: 1em;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.copy-button .lucide-check {
  color: var(--vp-c-success-1);
}
</style>
