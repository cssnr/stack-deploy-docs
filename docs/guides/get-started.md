---
prev:
  text: 'Get Help'
  link: '/support'
---

# Getting Started

<span class="search-keywords">Install and Setup Guide to Begin.</span>

To get started, create or update your [workflow file](#workflow) and review the [usage](#usage).

_You can also view the [features](features.md) and additional [examples](examples.md)._

If you need to run multiple docker commands see the [Docker Context](#docker-context) Action.
You can also deploy directly to [Portainer](#portainer).

## Workflow

Add the step to an existing workflow or create a new one.

_If creating a [new workflow](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows#about-workflows), place it in the `.github/workflows` <CB prev margin="0 8px 0" /> directory._

::: code-group
<<< @/snippets/basic/step.yaml {4,5,10,11 yaml} [Existing Workflow ~vscode-icons:folder-type-github~]
<<< @/snippets/basic/workflow.yaml {15,16,21,22 yaml} [New Workflow ~vscode-icons:folder-type-github~]
:::

**Make sure to update the highlighted lines and add your [secrets](#secrets).**

The only 4 required inputs are [name](../docs/inputs.md#name), [host](../docs/inputs.md#host), [user](../docs/inputs.md#user)
and [pass](../docs/inputs.md#pass) or [ssh_key](../docs/inputs.md#ssh_key) _(not both)_.

Check out the [Rolling Tags](features.md#rolling-tags) for more tag options, however `@v1` is recommended.

<LatestVersion repo="cssnr/stack-deploy-action" />

<div class="tip custom-block" style="padding-top: 8px">

See the [Inputs Documentation](../docs/inputs.md) for additional options and **default values**.

</div>

## Usage

The stack is deployed from the current actions working directory (no files copied). Therefore, all paths are relative to the actions' directory.

If you check out your repository to the root and your compose file is in the `app` directory, set [file](../docs/inputs.md#file) to: `app/docker-compose.yaml`

If using the [env_file](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/#use-the-env_file-attribute) compose directive in your stack file, this file's path would be relative to your `docker-compose.yaml` file.

The workflow runs based on the [events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) defined in the `on:` parameter.
If using the `workflow_dispatch` trigger you can [manually run the job](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow) at any time.

You can also view usage [Examples](examples.md).

<div class="tip custom-block" style="padding-top: 8px">

See the [Inputs Documentation](../docs/inputs.md) for more options and detailed usage.

</div>

## Command

The command used to deploy the stack is generated depending on mode.

::: code-group

```shell [Swarm ~vscode-icons:file-type-shell~]
docker stack deploy -c ${INPUT_FILE} ${EXTRA_ARGS[@]} ${INPUT_NAME}
```

```shell [Compose ~vscode-icons:file-type-shell~]
docker compose ${STACK_FILES[@]} -p ${INPUT_NAME} up -d -y ${EXTRA_ARGS[@]}
```

:::

**Compose.** To see how `${STACK_FILES[@]}` is generated see the [file](../docs/inputs.md#file) input documentation.

You can view the full deployment script on GitHub: [src/main.sh](https://github.com/cssnr/stack-deploy-action/blob/master/src/main.sh)

<div class="tip custom-block" style="padding-top: 8px">

See the [Inputs Documentation](../docs/inputs.md) for more options to customize the deployment.

</div>

## Secrets

You should store your credentials in [GitHub Actions Secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets).

The [SSH key](../docs/inputs.md#ssh_key) should be copied and pasted exactly as it appears in the private keyfile.

You do not need to add all values as a secret. However, be aware that any inputs not added as a secret,
will be visible in the [GitHub Actions Logs](https://docs.github.com/en/actions/how-tos/monitor-workflows/use-workflow-run-logs).

Likewise, if you add your GitHub username or the port number 22 as a secret,
these values will be replaced with `***`'s anywhere they appear in the logs, including repository names.

If working within an [GitHub Organization](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/about-organizations)
you can create these secrets in the organization and make them available to all your repositories.
_This is why I use the [cssnr](https://github.com/cssnr) organization._

## Docker Context

This action creates a docker context in the current workflow to run any docker commands.

<!--@include: ./include/context-action.md-->

More details on the website: https://actions.cssnr.com/docker-context

## Portainer

If you use Portainer, you should deploy directly to [Portainer](https://www.portainer.io/resources/get-started/install) for full control.

For this you should use [cssnr/portainer-stack-deploy-action](https://github.com/cssnr/portainer-stack-deploy-action).

- https://github.com/marketplace/actions/portainer-stack-deploy-action

For more details visit the website: https://portainer-deploy.cssnr.com/

&nbsp;

::: tip Request a Feature
If you need more options, please [open a feature request](https://github.com/cssnr/stack-deploy-action/discussions/categories/feature-requests)
:::
