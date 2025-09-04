# Examples

[[toc]]

💡 _Click on the heading to expand/collapse the item._

## Swarm

<details open><summary>Swarm with Defaults</summary>

```yaml
- name: 'Stack Deploy'
  uses: cssnr/stack-deploy-action@v1
  with:
    name: 'stack-name'
    file: 'docker-compose.yaml'
    host: ${{ secrets.DOCKER_HOST }}
    user: ${{ secrets.DOCKER_USER }}
    port: ${{ secrets.DOCKER_PORT }} # default 22
    pass: ${{ secrets.DOCKER_PASS }} # not needed with ssh_key
    ssh_key: ${{ secrets.DOCKER_SSH_KEY }} # not needed with pass
```

</details>
<details><summary>With Password, docker login and --with-registry-auth</summary>

```yaml
- name: 'Stack Deploy'
  uses: cssnr/stack-deploy-action@v1
  with:
    name: 'stack-name'
    file: 'docker-compose-swarm.yaml'
    host: ${{ secrets.DOCKER_HOST }}
    port: ${{ secrets.DOCKER_PORT }}
    user: ${{ secrets.DOCKER_USER }}
    pass: ${{ secrets.DOCKER_PASS }}
    registry_host: 'ghcr.io'
    registry_user: ${{ vars.GHCR_USER }}
    registry_pass: ${{ secrets.GHCR_PASS }}
```

</details>
<details><summary>With SSH Key, --prune, --detach=false and --resolve-image=changed</summary>

```yaml
- name: 'Stack Deploy'
  uses: cssnr/stack-deploy-action@v1
  with:
    name: 'stack-name'
    file: 'docker-compose-swarm.yaml'
    host: ${{ secrets.DOCKER_HOST }}
    port: ${{ secrets.DOCKER_PORT }}
    user: ${{ secrets.DOCKER_USER }}
    ssh_key: ${{ secrets.DOCKER_SSH_KEY }}
    detach: false
    prune: true
    resolve_image: 'changed'
```

</details>
<details><summary>With All Swarm Inputs</summary>

```yaml
- name: 'Stack Deploy'
  uses: cssnr/stack-deploy-action@v1
  with:
    name: 'stack-name'
    file: 'docker-compose-swarm.yaml'
    host: ${{ secrets.DOCKER_HOST }}
    port: ${{ secrets.DOCKER_PORT }}
    user: ${{ secrets.DOCKER_USER }}
    pass: ${{ secrets.DOCKER_PASS }} # not needed with ssh_key
    ssh_key: ${{ secrets.DOCKER_SSH_KEY }} # not needed with pass
    env_file: 'stack.env'
    detach: true
    prune: false
    resolve_image: 'always'
    registry_auth: true # not needed with registry_pass/registry_user
    registry_host: 'ghcr.io'
    registry_user: ${{ vars.GHCR_USER }}
    registry_pass: ${{ secrets.GHCR_PASS }}
    summary: true
```

</details>

## Compose

<details><summary>Compose with Defaults</summary>

```yaml
- name: 'Compose Deploy'
  uses: cssnr/stack-deploy-action@v1
  with:
    name: 'stack-name'
    file: 'docker-compose.yaml'
    host: ${{ secrets.DOCKER_HOST }}
    port: ${{ secrets.DOCKER_PORT }}
    user: ${{ secrets.DOCKER_USER }}
    ssh_key: ${{ secrets.DOCKER_SSH_KEY }}
    mode: compose
```

</details>
<details><summary>Compose with Custom Arguments</summary>

```yaml
- name: 'Compose Deploy'
  uses: cssnr/stack-deploy-action@v1
  with:
    name: 'stack-name'
    file: 'docker-compose.yaml'
    host: ${{ secrets.DOCKER_HOST }}
    port: ${{ secrets.DOCKER_PORT }}
    user: ${{ secrets.DOCKER_USER }}
    ssh_key: ${{ secrets.DOCKER_SSH_KEY }}
    mode: compose
    args: --remove-orphans --force-recreate
```

Note: these are the default arguments. If you use `args` this will override the default arguments unless they are included.
You can disable them by passing an empty string. For more details, see the compose up [docs](https://docs.docker.com/reference/cli/docker/compose/up/).

</details>
<details><summary>Compose with Private Image</summary>

```yaml
- name: 'Compose Deploy'
  uses: cssnr/stack-deploy-action@v1
  with:
    name: 'stack-name'
    file: 'docker-compose.yaml'
    host: ${{ secrets.DOCKER_HOST }}
    port: ${{ secrets.DOCKER_PORT }}
    user: ${{ secrets.DOCKER_USER }}
    ssh_key: ${{ secrets.DOCKER_SSH_KEY }}
    registry_host: 'ghcr.io'
    registry_user: ${{ vars.GHCR_USER }}
    registry_pass: ${{ secrets.GHCR_PASS }}
    mode: compose
```

</details>
<details><summary>With All Compose Inputs</summary>

```yaml
- name: 'Stack Deploy'
  uses: cssnr/stack-deploy-action@v1
  with:
    name: 'stack-name'
    file: 'docker-compose-swarm.yaml'
    host: ${{ secrets.DOCKER_HOST }}
    port: ${{ secrets.DOCKER_PORT }}
    user: ${{ secrets.DOCKER_USER }}
    pass: ${{ secrets.DOCKER_PASS }} # not needed with ssh_key
    ssh_key: ${{ secrets.DOCKER_SSH_KEY }} # not needed with pass
    env_file: 'stack.env'
    registry_host: 'ghcr.io'
    registry_user: ${{ vars.GHCR_USER }}
    registry_pass: ${{ secrets.GHCR_PASS }}
    mode: compose
    args: --remove-orphans --force-recreate
    summary: true
```

</details>

## Full Workflows

<details><summary>Simple Workflow Example</summary>

```yaml
name: 'Stack Deploy Action'

on:
  push:

jobs:
  deploy:
    name: 'Deploy'
    runs-on: ubuntu-latest
    timeout-minutes: 5

    steps:
      - name: 'Checkout'
        uses: actions/checkout@v4

      - name: 'Stack Deploy'
        uses: cssnr/stack-deploy-action@v1
        with:
          name: 'stack-name'
          file: 'docker-compose-swarm.yaml'
          host: ${{ secrets.DOCKER_HOST }}
          port: ${{ secrets.DOCKER_PORT }}
          user: ${{ secrets.DOCKER_USER }}
          pass: ${{ secrets.DOCKER_PASS }}
```

</details>
<details><summary>Full Workflow Example</summary>

```yaml
name: 'Stack Deploy Action'

on:
  workflow_dispatch:
    inputs:
      tags:
        description: 'Tags: comma,separated'
        required: true
        default: 'latest'

env:
  REGISTRY: 'ghcr.io'

concurrency:
  group: ${{ github.workflow }}
  cancel-in-progress: true

jobs:
  build:
  name: 'Build'
  runs-on: ubuntu-latest
  timeout-minutes: 15
  permissions:
    packages: write

  steps:
    - name: 'Checkout'
      uses: actions/checkout@v4

    - name: 'Setup Buildx'
      uses: docker/setup-buildx-action@v2
      with:
        platforms: 'linux/amd64,linux/arm64'

    - name: 'Docker Login'
      uses: docker/login-action@v3
      with:
        registry: $${{ env.REGISTRY }}
        username: ${{ secrets.GHCR_USER }}
        password: ${{ secrets.GHCR_PASS }}

    - name: 'Generate Tags'
      id: tags
      uses: cssnr/docker-tags-action@v1
      with:
        images: $${{ env.REGISTRY }}/${{ github.repository }}
        tags: ${{ inputs.tags }}

    - name: 'Build and Push'
      uses: docker/build-push-action@v6
      with:
        context: .
        platforms: 'linux/amd64,linux/arm64'
        push: true
        tags: ${{ steps.tags.outputs.tags }}
        labels: ${{ steps.tags.outputs.labels }}

  deploy:
    name: 'Deploy'
    runs-on: ubuntu-latest
    timeout-minutes: 5
    needs: [build]

    steps:
      - name: 'Checkout'
        uses: actions/checkout@v4

      - name: 'Stack Deploy'
        uses: cssnr/stack-deploy-action@v1
        with:
          name: 'stack-name'
          file: 'docker-compose-swarm.yaml'
          host: ${{ secrets.DOCKER_HOST }}
          port: ${{ secrets.DOCKER_PORT }}
          user: ${{ secrets.DOCKER_USER }}
          ssh_key: ${{ secrets.DOCKER_SSH_KEY }}

  cleanup:
    name: 'Cleanup'
    runs-on: ubuntu-latest
    timeout-minutes: 5
    needs: deploy
    permissions:
      contents: read
      packages: write

    steps:
      - name: 'Purge Cache'
        uses: cssnr/cloudflare-purge-cache-action@v2
        with:
          token: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          zones: cssnr.com
```

</details>

For more examples, you can check out other projects using this action:  
https://github.com/cssnr/stack-deploy-action/network/dependents
