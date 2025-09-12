# Features

Deploy a Docker [stack](https://docs.docker.com/reference/cli/docker/stack/deploy/) or [compose](https://docs.docker.com/reference/cli/docker/compose/up/) file, to a remote host over SSH,
using a [Remote Context](#remote-context). This deploys the stack from the current workspace without copying files.

- Deploy to Docker Swarm or Compose.
- Deploy over SSH using [keyfile](../docs/inputs.md#ssh_key) or [password](../docs/inputs.md#pass).
- Deploy from the current working [directory](#remote-context).
- Deploy from a private registry with [credentials](../docs/inputs.md#registry_user).
- [Job Summary](#job-summary) with deployment output, including errors.
- Supports multiple compose [files](../docs/inputs.md#file) and stack deployments.
- Allows setting custom [arguments](../docs/inputs.md#args) for the deployment command.
- **To view all features see the [Inputs Documentation](../docs/inputs.md).**

You can [get started here](get-started.md) or view [workflow examples](examples.md).

::: tip Request a Feature
If you need more options, please [open a feature request](https://github.com/cssnr/stack-deploy-action/discussions/categories/feature-requests)
:::

## Remote Context

This action uses a [remote context](https://docs.docker.com/engine/manage-resources/contexts/)
to deploy the stack on the remote host, from the current environment.

```shell
docker context create remote --docker "host=ssh://user@host:port"
docker context use remote
```

After this all the subsequent `docker` commands, such as `stack deploy` and `compose up` are executed on the remote context (host).

This allows you to run any steps to prepare your stack for deployment, in the workflow steps directly, without needing to copy any files.

::: details View workflow steps example

```yaml
steps:
  - name: 'Checkout'
    uses: actions/checkout@v5

  # Add Steps to Prepare Your Stack File or Environment...

  - name: 'Stack Deploy'
    uses: cssnr/stack-deploy-action@v1
    with:
      # inputs excluded
```

:::

## Job Summary

Unless disabled, a Job Summary is generated to capture the command, output and errors.

💡 _Click on the heading to expand/collapse the item._

::: details Successful Job Summary ✔️

---

<!--@include: ./include/summary-success.md-->

:::

::: details Failure Job Summary ❌

---

<!--@include: ./include/summary-failed.md-->

:::

You can view an actual workflow run from the [Test job](https://github.com/cssnr/stack-deploy-action/actions/workflows/test.yaml) on GitHub _(requires login)_.

## Rolling Tags

The following rolling [tags](https://github.com/cssnr/stack-deploy-action/tags) are maintained to improve stability across updates.

| Version&nbsp;Tag                                                                                                                                                                                                | Rolling | Bugs | Feat. |   Name    |  Target  | Example  |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----: | :--: | :---: | :-------: | :------: | :------- |
| [![GitHub Tag Major](https://img.shields.io/github/v/tag/cssnr/stack-deploy-action?sort=semver&filter=!v*.*&style=for-the-badge&label=%20&color=44cc10)](https://github.com/cssnr/stack-deploy-action/releases) |   ✅    |  ✅  |  ✅   | **Major** | `vN.x.x` | `vN`     |
| [![GitHub Tag Minor](https://img.shields.io/github/v/tag/cssnr/stack-deploy-action?sort=semver&filter=!v*.*.*&style=for-the-badge&label=%20&color=blue)](https://github.com/cssnr/stack-deploy-action/releases) |   ✅    |  ✅  |  ❌   | **Minor** | `vN.N.x` | `vN.N`   |
| [![GitHub Release](https://img.shields.io/github/v/release/cssnr/stack-deploy-action?style=for-the-badge&label=%20&color=red)](https://github.com/cssnr/stack-deploy-action/releases)                           |   ❌    |  ❌  |  ❌   | **Micro** | `vN.N.N` | `vN.N.N` |

You can view the release notes for each version on the [releases](https://github.com/cssnr/stack-deploy-action/releases) page.

The **Major** tag is recommended. It is the most up-to-date and always backwards compatible.
Breaking changes would result in a **Major** version bump. At a minimum you should use a **Minor** tag.
