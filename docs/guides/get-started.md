---
prev:
  text: 'Get Help'
  link: '/support'
---

# Getting Started

<span style="display:none;/*Search Keywords*/">install setup</span>

To get started, create or update your [workflow file](#workflow) and review the [usage](#secrets).

## Workflow

Add the step to an existing workflow or create a new one.

_If creating a [new workflow](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows#about-workflows), place it in the `.github/workflows` directory._

::: code-group
<<< @/snippets/basic/step.yaml {4,5,8,9,10,11 yaml} [Existing Workflow ~vscode-icons:folder-type-github~]
<<< @/snippets/basic/workflow.yaml {15,20,21,24,25,26,27 yaml} [New Workflow ~vscode-icons:folder-type-github~]
:::

**Make sure to update the highlighted lines.**

The only required inputs are `name`, `host`, `user` and `pass` or `ssh_key` _(not both)_.

See the [Inputs Documentation](../docs/inputs.md) for more options and **default** values.

## Usage

The stack is deployed from the current actions working directory (no files copied). Therefore, all paths are relative to the actions' directory.

If you check out your repository to the root and your compose file is in the `app` directory, set `file` to: `app/docker-compose.yaml`

If using the [env_file](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/#use-the-env_file-attribute) compose directive in your stack file, this file's path would be relative to your `docker-compose.yaml` file.

The workflow runs based on the [events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) defined in the `on:` parameter.
If using the `workflow_dispatch` trigger you can [manually run the job](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow) at any time.

There are many more [options](../docs/inputs.md) to customize your deployment.

## Secrets

You should store your credentials in [GitHub Actions Secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets).

The SSH Key should be copied and pasted exactly as it appears in the private key file.

You do not need to add all values as a secret. However, be aware that any inputs not added as a secret,
will be visible in the [GitHub Actions Logs](https://docs.github.com/en/actions/how-tos/monitor-workflows/use-workflow-run-logs).

Likewise, if you add your GitHub username or the port number 22 as a secret,
these values will be replaced with `***`'s anywhere they appear in the logs, including repository names.

If working within an [GitHub Organization](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/about-organizations)
you can create these secrets in the organization and make them available to all your repositories.
_This is why I use the [cssnr](https://github.com/cssnr) organization._

## Command

The command used to deploy the stack is generated depending on type.

```bash :line-numbers=179 [src/main.sh ~vscode-icons:file-type-shell~]
if [[ "${INPUT_MODE}" == "swarm" ]];then
    DEPLOY_TYPE="Swarm"
    COMMAND=("docker" "stack" "deploy" "-c" "${INPUT_FILE}" "${EXTRA_ARGS[@]}" "${INPUT_NAME}")
else
    DEPLOY_TYPE="Compose"
    COMMAND=("docker" "compose" "${STACK_FILES[@]}" "-p" "${INPUT_NAME}" "up" "-d" "-y" "${EXTRA_ARGS[@]}")
fi
```

Compose Note: `"${STACK_FILES[@]}"` is an array of `-f docker-compose.yaml` for every file in the `file` input (supports multiple files).

You can view the full deployment script on GitHub: [src/main.sh](https://github.com/cssnr/stack-deploy-action/blob/master/src/main.sh)

See the [Inputs Documentation](../docs/inputs.md) for more options to customize the deployment.

::: info FEATURE REQUEST
If you need more options, please [open a feature request](https://github.com/cssnr/stack-deploy-action/discussions/categories/feature-requests)
:::
