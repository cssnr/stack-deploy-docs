# Resources

A collection of resources and guides for getting started.

[[toc]]

## Video Guides

### Docker Stack VPS Guide

<YouTubeEmbed video-id="fuZoxuBiL9o" />

## Action Comparison

The majority of other actions available have not been recently updated
and most of them are forks and clones of each other.

This action was built from the ground up to deploy a Docker swarm stack
then updated to allow Docker compose deployments.

The goal of this action is to be the ultimate Docker deployment action on GitHub.
To date all [issue](https://github.com/cssnr/stack-deploy-action/issues) have been fixed
and all [feature requests](https://github.com/cssnr/stack-deploy-action/discussions/categories/feature-requests) added.

::: warning
None of these actions have been tested. This is an exhaustive list of published actions.
:::

::: details ▶️ Supported Types
✅ - Swarm and Compose  
🐳 - Swarm Only  
📋 - Compose Only  
❌ - Only Run, Pull, etc.
:::

<script setup>
import { repos } from '../../.vitepress/vars.js'
</script>
<StackTable :repos="repos" />

If there are any missing [features](../guides/features.md) you need,
please submit a [feature request](https://github.com/cssnr/stack-deploy-action/discussions/categories/feature-requests) and we will get them added...

&nbsp;

::: tip Additional Resources
Have a related resource? Let us know by submitting a [PR](https://github.com/cssnr/stack-deploy-docs/edit/master/docs/guides/examples.md)
or opening an [Issue](https://github.com/cssnr/stack-deploy-docs/issues) on [GitHub](https://github.com/cssnr/stack-deploy-docs).
:::
