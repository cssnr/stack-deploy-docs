# Inputs

💡 Click on the **Input Name** for more [Details](#details).

<div class="table-inputs">

| Input&nbsp;Name                              | Default&nbsp;Value                  | Short&nbsp;Description&nbsp;of&nbsp;the&nbsp;Input&nbsp;Value |
| :------------------------------------------- | :---------------------------------- | :------------------------------------------------------------ |
| [name](#name) **\*** <CB />                  | -                                   | Docker Stack/Project Name                                     |
| [file](#file) <CB />                         | `docker-compose.yaml`               | Docker Stack/Compose File(s)                                  |
| [mode](#mode) **¹** <CB />                   | `swarm`                             | Deploy Mode [`swarm`, `compose`]                              |
| [args](#args) **¹** <CB />                   | `--remove-orphans --force-recreate` | Additional **Compose** Arguments                              |
| [host](#host) **\*** <CB />                  | -                                   | Remote Docker Hostname or IP                                  |
| [port](#port) <CB />                         | `22`                                | Remote Docker Port                                            |
| [user](#user) **\*** <CB />                  | -                                   | Remote Docker Username                                        |
| [pass](#pass) **\*** <CB />                  | -                                   | Remote Docker Password                                        |
| [ssh_key](#ssh_key) **\*** <CB />            | -                                   | Remote SSH Key File                                           |
| [disable_keyscan](#disable_keyscan) <CB />   | `false`                             | Disable SSH Keyscan `ssh-keyscan`                             |
| [env_file](#env_file) <CB />                 | -                                   | Exported Environment File                                     |
| [detach](#detach) **²** <CB />               | `true`                              | Detach Flag, `false`, to disable                              |
| [prune](#prune) **²** <CB />                 | `false`                             | Prune Flag, `true`, to enable                                 |
| [resolve_image](#resolve_image) **²** <CB /> | `always`                            | Resolve [`always`, `changed`, `never`]                        |
| [registry_auth](#registry_auth) **²** <CB /> | `false`                             | Enable Registry Authentication                                |
| [registry_host](#registry_host) <CB />       | -                                   | Registry Authentication Host                                  |
| [registry_user](#registry_user) <CB />       | -                                   | Registry Authentication Username                              |
| [registry_pass](#registry_pass) <CB />       | -                                   | Registry Authentication Password                              |
| [summary](#summary) <CB />                   | `true`                              | Add Job Summary                                               |

</div>

> **\* Required**, note [pass](#pass)/[ssh_key](#ssh_key) are mutually exclusive.  
> **¹ Compose Only**, view the [Compose Docs](https://docs.docker.com/reference/cli/docker/compose/up/)  
> **² Swarm Only**, view the [Swarm Docs](https://docs.docker.com/reference/cli/docker/stack/deploy/)

## Details

### name <CB /> <Badge type="warning" text="Required" />

Swarm sack name or Compose project name.

Example: `cool-stack`

### file <CB />

Stack file or Compose file(s).

_Compose._ [Multiple files](https://docs.docker.com/compose/how-tos/multiple-compose-files/) can be provided, **space seperated**,
and the `-f` flag will be automatically prepended to each file.

Example: `web.yaml db.yaml`  
Output: `-f web.yaml -f db.yaml`

_Swarm._ Only supports 1 file per stack.

Default: `docker-compose.yaml`

### mode <CB /> <Badge type="tip" text="Compose Only" />

Set this to `compose` to use [compose up](https://docs.docker.com/reference/cli/docker/compose/up/) for non-swarm hosts.

Default: `swarm`

### args <CB /> <Badge type="tip" text="Compose Only" />

Compose arguments to pass to the `compose up` command. Only used for `mode: compose` deployments.
The `detach` flag defaults to false for compose. With no args the default is `--remove-orphans --force-recreate`.
Use an empty string to override. For more details, see the compose
[docs](https://docs.docker.com/reference/cli/docker/compose/up/).

Default: `--remove-orphans --force-recreate`

### host <CB /> <Badge type="warning" text="Required" />

The hostname or IP address of the remote docker server to deploy too.
If your hostname is behind a proxy like Cloudflare you will need to use the IP address.

You may be able to find your Public IP with one of these commands.

::: code-group

```shell [curl ~vscode-icons:file-type-shell~]
curl ip.me
```

```shell [curl -4 ~vscode-icons:file-type-shell~]
curl -4 ifconfig.co
```

```shell [wget ~vscode-icons:file-type-shell~]
echo $(wget -qO- https://ipecho.net/plain)
```

```shell [dig ~vscode-icons:file-type-shell~]
dig TXT +short o-o.myaddr.l.google.com @ns1.google.com
```

:::

### port <CB />

SSH Port. Only set this if using a non-standard port.

Default: `22`

### user <CB /> <Badge type="warning" text="Required" />

SSH Username. This user **must** have permissions to access docker.

If you use `sudo` or the `root` user to access docker,
it is recommended you grant docker access to another user or service account.

Replace `mynewuser` with your actual username.

```shell [run ~vscode-icons:file-type-shell~]
sudo usermod -aG docker mynewuser
```

After this you should be able to run `docker` commands as `mynewuser` without `sudo`.
Note, you may need to log out and back in for the changes to take effect.

### pass <CB /> <Badge type="warning" text="Required" />

You must provide either a `pass` or [ssh_key](#ssh_key), but **not** both.

When using a password, a temporary key is generated using [ssh-keygen](https://linux.die.net/man/1/ssh-copy-id)
and copied to the host with [ssh-copy-id](https://linux.die.net/man/1/ssh-copy-id) using [sshpass](https://linux.die.net/man/1/sshpass).
The authorized_keys file entry is [cleaned up](https://github.com/cssnr/stack-deploy-action/blob/master/src/main.sh#L10) after each deploy.

### ssh_key <CB /> <Badge type="warning" text="Required" /> {#ssh_key}

You must provide either a `ssh_key` or [pass](#pass), but **not** both.

To generate an SSH key, run the following as the deployment [user](#user):

::: code-group

```shell [ed25519 ~vscode-icons:file-type-shell~]
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519 -N ""
cat ~/.ssh/id_ed25519
```

```shell [rsa ~vscode-icons:file-type-shell~]
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""
cat ~/.ssh/id_rsa
```

:::

### disable_keyscan <CB /> {#disable_keyscan}

This will disable the [ssh-keyscan](https://linux.die.net/man/1/ssh-keyscan) command. **Advanced usage only.**

Enabling this will **break** deployments unless you know what you are doing.

Default: `false`

### env_file <CB /> {#env_file}

Variables in this file are exported before running stack deploy.
If you need compose file templating this can also be done in a previous step.

_Compose._ You can also add to the [args](#args) with `--env-file stringArray`.

::: info
**This is NOT** the Docker compose [env_file](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/#use-the-env_file-attribute) directive.
That is set in your compose file as normal.
:::

### detach <CB /> <Badge type="tip" text="Swarm Only" />

Set this to `false` to not exit immediately and wait for the services to converge.
This will generate extra output in the logs and is useful for debugging deployments.

_Compose_. The detach flag is implied in compose.

_See the [stack deploy Options](https://docs.docker.com/reference/cli/docker/stack/deploy/#options) for more details._

Default: `true`

### prune <CB />

Prune services that are no longer referenced. Set to `true` to enable.

_See the [stack deploy Options](https://docs.docker.com/reference/cli/docker/stack/deploy/#options) for more details._

Default: `false`

### resolve_image <CB /> <Badge type="tip" text="Swarm Only" /> {#resolve_image}

Can be one of: [`always`, `changed`, `never`]

When the default `always` is used, this argument is omitted.

_See the [stack deploy Options](https://docs.docker.com/reference/cli/docker/stack/deploy/#options) for more details._

Default: `always`

### registry_auth <CB /> <Badge type="tip" text="Swarm Only" /> {#registry_auth}

Set to `true` to deploy with `--with-registry-auth`.

If setting [registry_user](#registry_user)/[registry_pass](#registry_pass) this is implied.

_See the [stack deploy Options](https://docs.docker.com/reference/cli/docker/stack/deploy/#options) for more details._

Default: `false`

### registry_host <CB /> {#registry_host}

To run [docker login](https://docs.docker.com/reference/cli/docker/login/) on another registry.

Example: `ghcr.io`

### registry_pass <CB /> {#registry_pass}

Required to run [docker login](https://docs.docker.com/reference/cli/docker/login/) before stack deploy.

### registry_user <CB /> {#registry_user}

Required to run [docker login](https://docs.docker.com/reference/cli/docker/login/) before stack deploy.

### summary <CB />

Write a Summary for the job. To disable this set to `false`.

For more information see [Job Summary](../guides/features.md#job-summary).

Default: `true`

<style>
.table-inputs td {
    padding: 8px 10px !important;
}

.table-inputs td:nth-child(1),
.table-inputs td:nth-child(3) {
    white-space: nowrap;
}
</style>
