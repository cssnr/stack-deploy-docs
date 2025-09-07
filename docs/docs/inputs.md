# Inputs

The inputs are organized in a table for quick [reference](#reference) with additional [details](#details) below.

## Reference

💡 You can click on an input for more [Details](#details).

| Input&nbsp;Name                               | Default&nbsp;Value                  | Short&nbsp;Description&nbsp;of&nbsp;the&nbsp;Input&nbsp;Value |
| :-------------------------------------------- | :---------------------------------- | :------------------------------------------------------------ |
| [name](#name) **\***                          | -                                   | Docker Stack/Project Name                                     |
| [file](#file)                                 | `docker-compose.yaml`               | Docker Stack/Compose File(s)                                  |
| [mode](#mode) **¹**                           | `swarm`                             | Deploy Mode [`swarm`, `compose`]                              |
| [args](#args) **¹**                           | `--remove-orphans --force-recreate` | Additional **Compose** Arguments                              |
| [host](#host) **\***                          | -                                   | Remote Docker Hostname or IP                                  |
| port                                          | `22`                                | Remote Docker Port                                            |
| user **\***                                   | -                                   | Remote Docker Username                                        |
| [pass](#pass-ssh-key) **\***                  | -                                   | Remote Docker Password                                        |
| [ssh_key](#pass-ssh-key) **\***               | -                                   | Remote SSH Key File                                           |
| [disable_keyscan](#disable-keyscan)           | `false`                             | Disable SSH Keyscan `ssh-keyscan`                             |
| [env_file](#env-file)                         | -                                   | Exported Environment File                                     |
| [detach](#detach) **²**                       | `true`                              | Detach Flag, `false`, to disable                              |
| prune **²**                                   | `false`                             | Prune Flag, `true`, to enable                                 |
| [resolve_image](#resolve-image) **²**         | `always`                            | Resolve [`always`, `changed`, `never`]                        |
| [registry_auth](#registry-auth) **²**         | -                                   | Enable Registry Authentication                                |
| [registry_host](#registry-host)               | -                                   | Registry Authentication Host                                  |
| [registry_user](#registry-user-registry-pass) | -                                   | Registry Authentication Username                              |
| [registry_pass](#registry-user-registry-pass) | -                                   | Registry Authentication Password                              |
| [summary](#summary)                           | `true`                              | Add Job Summary                                               |

> **\* Required**, note [pass/ssh_key](#pass-ssh-key) are mutually exclusive.  
> **¹ Compose Only**, view the [Compose Docs](https://docs.docker.com/reference/cli/docker/compose/up/)  
> **² Swarm Only**, view the [Swarm Docs](https://docs.docker.com/reference/cli/docker/stack/deploy/)

## Details

### name

Swarm sack name or Compose project name.

Example: `cool-stack`

### file

Stack file or Compose file(s).

_Swarm._ Only supports 1 file per stack.

_Compose._ [Multiple files](https://docs.docker.com/compose/how-tos/multiple-compose-files/) can be provided, **space seperated**,
and the `-f` flag will be automatically prepended to each file.

Example: `web.yaml db.yaml`  
Output: `-f web.yaml -f db.yaml`

### mode <Badge type="warning">Compose Only</Badge> {#mode}

Enable Docker Compose mode by setting this to `compose`.

Ths deploy will use [compose up](https://docs.docker.com/reference/cli/docker/compose/up/)
instead of [stack deploy](https://docs.docker.com/reference/cli/docker/stack/deploy/) for non-swarm hosts.

Example: `compose`

### args <Badge type="warning">Compose Only</Badge> {#args}

Compose arguments to pass to the `compose up` command. Only used for `mode: compose` deployments.
The `detach` flag defaults to false for compose. With no args the default is `--remove-orphans --force-recreate`.
Use an empty string to override. For more details, see the compose
[docs](https://docs.docker.com/reference/cli/docker/compose/up/).

Example: `--remove-orphans --force-recreate`

### host

The hostname or IP address of the remote docker server to deploy too.
If your hostname is behind a proxy like Cloudflare you will need to use the IP address.

If you don't know your Public IP, you may be able to find it using one of these commands.

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

### pass/ssh_key

You must provide either a `pass` or `ssh_key`, but **not** both.

When using a password, a temporary key is generated using [ssh-keygen](https://linux.die.net/man/1/ssh-copy-id)
and copied to the host with [ssh-copy-id](https://linux.die.net/man/1/ssh-copy-id) using [sshpass](https://linux.die.net/man/1/sshpass).
The authorized_keys file entry is [cleaned up](https://github.com/cssnr/stack-deploy-action/blob/master/src/main.sh#L10) after each deploy.

To generate an SSH key, run the following as the `user` you are using:

::: code-group

```shell [rsa ~vscode-icons:file-type-shell~]
ssh-keygen -f ~/.ssh/id_rsa -N ""
cat ~/.ssh/id_rsa
```

```shell [ed25519 ~vscode-icons:file-type-shell~]
ssh-keygen -f ~/.ssh/id_ed25519 -N ""
cat ~/.ssh/id_ed25519
```

:::

### disable_keyscan

This will disable the [ssh-keyscan](https://linux.die.net/man/1/ssh-keyscan) command. **Advanced usage only.**

### env_file

Variables in this file are exported before running stack deploy.
If you need compose file templating this can also be done in a previous step.

_Compose._ You can also add to the [args](#args) with `--env-file stringArray`.

::: tip IMPORTANT
**This is NOT** the Docker compose [env_file](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/#use-the-env_file-attribute) directive.
That is set in your compose file as normal.
:::

### detach <Badge type="warning">Swarm Only</Badge> {#detach}

Set this to `false` to not exit immediately and wait for the services to converge.
This will generate extra output in the logs and is useful for debugging deployments.

Defaults to `false` in `mode: compose`.

See the [stack deploy Options](https://docs.docker.com/reference/cli/docker/stack/deploy/#options) for more details.

### resolve_image <Badge type="warning">Swarm Only</Badge> {#resolve-image}

When the default `always` is used, this argument is omitted.

See the [stack deploy Options](https://docs.docker.com/reference/cli/docker/stack/deploy/#options) for more details.

### registry_auth <Badge type="warning">Swarm Only</Badge> {#registry-auth}

Set to `true` to deploy with `--with-registry-auth`.

If setting [registry_user](#registry-user-registry-pass)/[registry_pass](#registry-user-registry-pass) this is implied.

See the [stack deploy Options](https://docs.docker.com/reference/cli/docker/stack/deploy/#options) for more details.

### registry_host

To run [docker login](https://docs.docker.com/reference/cli/docker/login/) on another registry.

Example: `ghcr.io`

### registry_user/registry_pass

Required to run [docker login](https://docs.docker.com/reference/cli/docker/login/) before stack deploy.

### summary

Write a Summary for the job. To disable this set to `false`.

For more information see [Job Summary](../guides/features.md#job-summary).
