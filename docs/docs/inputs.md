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
| [env_file](#env_-ile)                         | -                                   | Exported Environment File                                     |
| [detach](#detach) **²**                       | `true`                              | Detach Flag, `false`, to disable                              |
| [prune](#prune) **²**                         | `false`                             | Prune Flag, `true`, to enable                                 |
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

Stack file or Compose file(s).

Compose: Multiple files can be provided, space seperated.  
This will prepend the `-f` flag to each file.

Example: `web.yaml db.yaml`

### mode

_Compose only._ Set this to `compose` to use `compose up` instead of `stack deploy` for non-swarm hosts.

### args

_Compose only._ Compose arguments to pass to the `compose up` command. Only used for `mode: compose` deployments.
The `detach` flag defaults to false for compose. With no args the default is `--remove-orphans --force-recreate`.
Use an empty string to override. For more details, see the compose
[docs](https://docs.docker.com/reference/cli/docker/compose/up/).

### host

The hostname or IP address of the remote docker server to deploy too.
If your hostname is behind a proxy like Cloudflare you will need to use the IP address.

### pass/ssh_key

You must provide either a `pass` or `ssh_key`, but **not** both.

### disable_keyscan

This will disable the `ssh-keyscan` command. Advanced use only.

### env_file

Variables in this file are exported before running stack deploy.
To use a docker `env_file` specify it in your compose file and make it available in a previous step.
If you need compose file templating this can also be done in a previous step.
If using `mode: compose` you can also add the `compose_arg: --env-file stringArray`.

### detach

_Swarm only._ Set this to `false` to not exit immediately and wait for the services to converge.
This will generate extra output in the logs and is useful for debugging deployments.
Defaults to `false` in `mode: compose`.

### resolve_image

_Swarm only._ When the default `always` is used, this argument is omitted.

### registry_auth

_Swarm only._ Set to `true` to deploy with `--with-registry-auth`.

If setting `registry_user/registry_pass` this is implied.

### registry_host

To run `docker login` on another registry.

Example: `ghcr.io`

### registry_user/registry_pass

Required to run `docker login` before stack deploy.

### summary

Write a Summary for the job. To disable this set to `false`.
