<script setup>
const props = defineProps({
  title: { type: String, default: 'YouTube video player' },
  style: { type: String, default: 'margin: 16px 0' },
  src: { type: String, default: null }, // Source URL overrides all other parameters
  videoId: { type: String, default: null }, // Video ID used with other parameters
  autoplay: { type: String, default: '0' },
  controls: { type: String, default: '1' },
  loop: { type: String, default: '0' },
  rel: { type: String, default: '0' },
  start: { type: String, default: null },
})

let srcUrl
if (props.src) {
  srcUrl = props.src
} else if (props.videoId) {
  const params = new URLSearchParams({
    autoplay: props.autoplay,
    controls: props.controls,
    loop: props.loop,
    rel: props.rel,
  })
  if (props.start) params.set('start', props.start)
  srcUrl = `https://www.youtube-nocookie.com/embed/${props.videoId}?${params.toString()}`
} else {
  console.warn('%c YouTubeEmbed', 'color: Red', 'Missing param: videoId or src')
}
// console.debug('%c YouTubeEmbed', 'color: Red', 'srcUrl:', srcUrl)
</script>

<template>
  <iframe
    width="100%"
    :style="props.style"
    :src="srcUrl"
    :title="props.title"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</template>

<style scoped>
iframe {
  aspect-ratio: 16 / 9;
}
</style>
