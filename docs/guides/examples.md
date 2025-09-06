# Examples

[[toc]]

💡 _Click on the heading to expand/collapse the item._

## Swarm

<details open><summary>Swarm with Defaults</summary>

<<< @/snippets/examples/swarm/basic.yaml [yaml]

</details>
<details><summary>With Password, docker login and --with-registry-auth</summary>

<<< @/snippets/examples/swarm/registry.yaml [yaml]

</details>
<details><summary>With SSH Key, --prune, --detach=false and --resolve-image=changed</summary>

<<< @/snippets/examples/swarm/options.yaml [yaml]

</details>
<details><summary>With All Swarm Inputs</summary>

<<< @/snippets/examples/swarm/full.yaml [yaml]

</details>

## Compose

<details><summary>Compose with Defaults</summary>

<<< @/snippets/examples/compose/basic.yaml [yaml]

</details>
<details><summary>Compose with Private Image</summary>

<<< @/snippets/examples/compose/registry.yaml [yaml]

</details>
<details><summary>Compose with Custom Arguments</summary>

<<< @/snippets/examples/compose/options.yaml [yaml]

Note: these are the default arguments. If you use `args` this will override the default arguments unless they are included.
You can disable them by passing an empty string. For more details, see the compose up [docs](https://docs.docker.com/reference/cli/docker/compose/up/).

</details>
<details><summary>With All Compose Inputs</summary>

<<< @/snippets/examples/compose/full.yaml [yaml]

</details>

## Full Workflows

<details><summary>Simple Workflow Example</summary>

<<< @/snippets/examples/workflows/simple.yaml [yaml]

</details>
<details><summary>Full Workflow Example</summary>

<<< @/snippets/examples/workflows/full.yaml [yaml]

</details>

For more examples, you can check out other projects using this action:  
https://github.com/cssnr/stack-deploy-action/network/dependents

<style scoped>
summary {
    color: var(--vp-c-brand-1);
}
summary:hover {
    filter: brightness(115%);
    /*color: var(--vp-c-indigo-2);*/
    /*text-decoration: underline;*/
    /*text-decoration-thickness: 1px;*/
}
</style>
