# Inputs

The inputs are organized in a table for quick [reference](#reference) with additional [details](#details) below.

## Reference

💡 You can click on each input for more [Details](#details).

| Input&nbsp;Name                               | Default&nbsp;Value                  | Short&nbsp;Description&nbsp;of&nbsp;the&nbsp;Input&nbsp;Value |
| :-------------------------------------------- | :---------------------------------- | :------------------------------------------------------------ |
| [name](#name) **\***                          | -                                   | Docker Stack/Project Name                                     |
| [file](#file)                                 | `docker-compose.yaml`               | Docker Stack/Compose File(s)                                  |
| [mode](#mode) **¹**                           | `swarm`                             | Deploy Mode [`swarm`, `compose`]                              |
| [args](#args) **¹**                           | `--remove-orphans --force-recreate` | Additional **Compose** Arguments                              |
| [host](#host)                                 | -                                   | Remote Docker Hostname or IP                                  |
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

the stack name for Swarm and project name for Compose.

Example: `cool-stack`

### file

Stack file or Compose file(s). _Swarm_ only supports 1 file per stack.

_Compose._ [Multiple files](https://docs.docker.com/compose/how-tos/multiple-compose-files/) can be provided, space seperated. and the `-f` flag will be prepended to each file.

Example: `web.yaml db.yaml`  
Output: `-f web.yaml -f db.yaml`

### mode

**Compose Only.** Set this to `compose` to use [compose up](https://docs.docker.com/reference/cli/docker/compose/up/) instead of [stack deploy](https://docs.docker.com/reference/cli/docker/stack/deploy/) for non-swarm hosts.

### args

**Compose Only.** Compose arguments to pass to the `compose up` command. Only used for `mode: compose` deployments.
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
and copied to the host using [ssh-copy-id](https://linux.die.net/man/1/ssh-copy-id).
The authorized_keys file is [cleaned up](https://github.com/cssnr/stack-deploy-action/blob/master/src/main.sh#L10) after each deploy.

To generate an SSH run the following as the `user` you are using:

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
If using `mode: compose` you can also add the `compose_arg: --env-file stringArray`.

::: tip IMPORTANT
**This is NOT** the Docker compose [env_file](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/#use-the-env_file-attribute) directive.
That is set in your compose file as normal.
:::

### detach

**Swarm Only.** Set this to `false` to not exit immediately and wait for the services to converge.
This will generate extra output in the logs and is useful for debugging deployments.

Defaults to `false` in `mode: compose`.

### resolve_image

**Swarm Only.** When the default `always` is used, this argument is omitted.

### registry_auth

**Swarm Only.** Set to `true` to deploy with `--with-registry-auth`.

If setting `registry_user`/`registry_pass` this is implied.

### registry_host

To run [docker login](https://docs.docker.com/reference/cli/docker/login/) on another registry.

Example: `ghcr.io`

### registry_user/registry_pass

Required to run [docker login](https://docs.docker.com/reference/cli/docker/login/) before stack deploy.

### summary

Write a Summary for the job. To disable this set to `false`.

For more information see [Job Summary](../guides/features.md#job-summary).
