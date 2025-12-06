[![GitHub Deployments](https://img.shields.io/github/deployments/cssnr/stack-deploy-docs/github-pages?logo=github&label=deploy)](https://github.com/cssnr/stack-deploy-docs/deployments)
[![GitHub Pages](https://img.shields.io/github/actions/workflow/status/cssnr/stack-deploy-docs/pages.yaml?logo=cachet&label=pages)](https://github.com/cssnr/stack-deploy-docs/actions/workflows/pages.yaml)
[![GitHub Lint](https://img.shields.io/github/actions/workflow/status/cssnr/stack-deploy-docs/lint.yaml?logo=cachet&label=lint)](https://github.com/cssnr/stack-deploy-docs/actions/workflows/lint.yaml)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/stack-deploy-docs?logo=vitepress&logoColor=white&label=updated)](https://github.com/cssnr/stack-deploy-docs/pulse)
[![GitHub Contributors](https://img.shields.io/github/contributors-anon/cssnr/stack-deploy-docs?logo=github)](https://github.com/cssnr/stack-deploy-docs/graphs/contributors)
[![GitHub Repo Size](https://img.shields.io/github/repo-size/cssnr/stack-deploy-docs?logo=bookstack&logoColor=white&label=repo%20size)](https://github.com/cssnr/stack-deploy-docs)
[![GitHub Discussions](https://img.shields.io/github/discussions/cssnr/stack-deploy-action?logo=github)](https://github.com/cssnr/stack-deploy-action/discussions)
[![GitHub Repo Stars](https://img.shields.io/github/stars/cssnr/stack-deploy-action?style=flat&logo=github)](https://github.com/cssnr/stack-deploy-action)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&label=org%20stars)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-72a5f2?logo=kofi&label=support)](https://ko-fi.com/cssnr)

# Docker Stack Deploy Action Docs

Documentation for the [Docker Stack Deploy Action](https://github.com/cssnr/stack-deploy-action).

- https://docker-deploy.cssnr.com/

These [docs](docs) are **written in plain text** using Markdown and built with [VitePress](https://vitepress.dev/).

| Location                                                                 | Description                                                                            |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| [docs](docs)                                                             | Documentation Root (Markdown files)                                                    |
| [docs/public](docs/public)                                               | Static Root (copied to docs root)                                                      |
| [docs/index.md](docs/index.md)                                           | Special [VitePress Home Page](https://vitepress.dev/reference/default-theme-home-page) |
| [.vitepress](.vitepress)                                                 | VitePress Configuration Root                                                           |
| [.vitepress/config.mts](.vitepress/config.mts)                           | VitePress Configuration File                                                           |
| [.vitepress/theme](.vitepress/theme)                                     | VitePress Custom Theme Root                                                            |
| [.vitepress/theme/index.js](.vitepress/theme/index.js)                   | VitePress Custom Theme File                                                            |
| [.vitepress/theme/custom.css](.vitepress/theme/custom.css)               | VitePress Global CSS File                                                              |
| [.vitepress/theme/components](.vitepress/theme/components)               | VitePress Components Root                                                              |
| [@components/StackTable.vue](.vitepress/theme/components/StackTable.vue) | StackTable Component                                                                   |

## Development

To get started, clone the repository and run `npm i` then `npm run dev`.

```shell
npm install
npm run dev
```

The site should now be available at: http://localhost:5173/

- [VitePress CLI Reference](https://vitepress.dev/reference/cli)
- [VitePress Markdown Reference](https://vitepress.dev/guide/markdown)

# Contributing

For instructions on modifying the documentation see the [CONTRIBUTING.md](#contributing-ov-file).

Please consider making a donation to support the development of this project
and [additional](https://cssnr.com/) open source projects.

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/cssnr)

For a full list of current projects visit: [https://cssnr.github.io/](https://cssnr.github.io/)
