<div class="info custom-block" style="padding-top: 8px">

<Badge type="tip" text="New" style="margin-right: 12px;" /> [Docker Context Action](https://github.com/cssnr/docker-context-action?tab=readme-ov-file#readme)

Set up a docker context in the current workflow to run `docker` commands in subsequent steps.

<details><summary>View Context Action Example</summary>

```yaml
steps:
  - name: 'Docker Context'
    uses: cssnr/docker-context-action@v1
    with:
      host: ${{ secrets.DOCKER_HOST }}
      user: ${{ secrets.DOCKER_USER }}
      pass: ${{ secrets.DOCKER_PASS }}

  - name: 'Stack Deploy'
    runs: docker stack deploy -c docker-compose.yaml --detach=false stack-name
```

See the [README.md](https://github.com/cssnr/docker-context-action?tab=readme-ov-file#readme) on [GitHub](https://github.com/cssnr/docker-context-action) for more details.

</details>

</div>
