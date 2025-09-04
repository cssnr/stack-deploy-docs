# Features

Deploy a Docker [stack](https://docs.docker.com/reference/cli/docker/stack/deploy/) or [compose](https://docs.docker.com/reference/cli/docker/compose/up/) file, to a remote host over SSH,
using a [remote context](https://docs.docker.com/engine/manage-resources/contexts/). This deploys the stack from the current workspace without copying files.

- Deploy to Docker Swarm or Compose.
- Deploy over SSH using keyfile or password.
- Deploy from the current working directory.
- Deploy from a private registry with credentials.
- [Job Summary](#job-summary) with deployment output, including errors.
- Supports multiple compose file and stack deployments.
- Allows setting custom arguments for the deployment command.

You can [get started here](get-started.md) or view [workflow examples](examples.md).

::: info FEATURE REQUEST
If you need more options, please [open a feature request](https://github.com/cssnr/stack-deploy-action/discussions/categories/feature-requests)
:::

## Job Summary

Unless disabled, a Job Summary is generated to capture the command, output and errors.

💡 _Click on the heading to expand/collapse the item._

::: details Successful Job Summary ✔️

---

🚀 Swarm Stack `test_stack-deploy` Successfully Deployed.

```text
docker stack deploy -c docker-compose.yaml --detach=false --resolve-image=changed test_stack-deploy
```

<details><summary>Results</summary>

```text
Updating service test_stack-deploy_alpine (id: tdk8v42m0rvp9hz4rbfrtszb6)
1/1:
overall progress: 0 out of 1 tasks
overall progress: 1 out of 1 tasks
verify: Waiting 5 seconds to verify that tasks are stable...
verify: Waiting 4 seconds to verify that tasks are stable...
verify: Waiting 3 seconds to verify that tasks are stable...
verify: Waiting 2 seconds to verify that tasks are stable...
verify: Waiting 1 seconds to verify that tasks are stable...
verify: Service tdk8v42m0rvp9hz4rbfrtszb6 converged
```

</details>

:::

::: details Failure Job Summary ❌

---

⛔ Swarm Stack `test_stack-deploy` Failed to Deploy!

```text
docker stack deploy -c docker-compose.yaml --detach=false --resolve-image=changed test_stack-deploy
```

<details open><summary>Errors</summary>

```text
Creating network test_stack-deploy_default
failed to create network test_stack-deploy_default: Error response from daemon: network with name test_stack-deploy_default already exists
```

</details>

:::

You can view an actual workflow run from the [Test job](https://github.com/cssnr/stack-deploy-action/actions/workflows/test.yaml) on GitHub _(requires login)_.

## Rolling Tags

The following rolling [tags](https://github.com/cssnr/stack-deploy-action/tags) are maintained to improve stability across updates.

| Version&nbsp;Tag                                                                                                                                                                                                       | Rolling | Bugs | Feat. |   Name    |  Target  | Example  |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----: | :--: | :---: | :-------: | :------: | :------- |
| [![GitHub Tag Major](https://img.shields.io/github/v/tag/cssnr/stack-deploy-action?sort=semver&filter=!v*.*&style=for-the-badge&label=%20&color=44cc10)](https://github.com/cssnr/stack-deploy-action/releases/latest) |   ✅    |  ✅  |  ✅   | **Major** | `vN.x.x` | `vN`     |
| [![GitHub Tag Minor](https://img.shields.io/github/v/tag/cssnr/stack-deploy-action?sort=semver&filter=!v*.*.*&style=for-the-badge&label=%20&color=blue)](https://github.com/cssnr/stack-deploy-action/releases/latest) |   ✅    |  ✅  |  ❌   | **Minor** | `vN.N.x` | `vN.N`   |
| [![GitHub Release](https://img.shields.io/github/v/release/cssnr/stack-deploy-action?style=for-the-badge&label=%20&color=red)](https://github.com/cssnr/stack-deploy-action/releases/latest)                           |   ❌    |  ❌  |  ❌   | **Micro** | `vN.N.N` | `vN.N.N` |

You can view the release notes for each version on the [releases](https://github.com/cssnr/stack-deploy-action/releases) page.

The **Major** tag is recommended. It is the most up-to-date and always backwards compatible.
Breaking changes would result in a **Major** version bump. At a minimum you should use a **Minor** tag.
