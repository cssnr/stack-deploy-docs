# Contributing

To make changes to the documentation complete the following steps.

1. Fork the source [repository](https://github.com/cssnr/stack-deploy-docs/fork).
2. Create a branch in your fork.
3. Make your [Changes](#Changes).
4. [Verify](#Verify) the changes.
5. Commit and push your changes to your branch.
6. Create a PR to the source [repository](https://github.com/cssnr/stack-deploy-docs).
7. Verify all the checks are passing.
8. Complete any applicable tasks.
9. Make sure to keep your branch up-to-date.

> [!NOTE]  
> This CONTRIBUTING guide is a work in progress.  
> To suggest a change please open a [PR](https://github.com/cssnr/stack-deploy-docs/fork)
> or an [Issue](https://github.com/cssnr/stack-deploy-docs/issues).

## Changes

While modifying the docs you can view a live preview with hot reloading.

```shell
npm install
npm run dev
```

## Verify

Before pushing your changes, verify the build completes without error.

```shell
npm run build
```

You can then preview the live build to ensure it appears as expected.

```shell
npm run preview
```

Lastly, make sure everything is formatted with Prettier.

```shell
npm run prettier
```

Otherwise, format them manually.

```shell
npx prettier --write .
```

For more details on checks see: [.github/workflows/lint.yaml](.github/workflows/lint.yaml)
