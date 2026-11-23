---
title: Installation
description: Install komoot-client via npm straight from the GitHub repository. Which Node.js version you need, why Git is required and that the package is pure ESM.
order: 10
slug: installation
section: Getting started
---

The package is not on npmjs.com. The easiest way is to install it straight from the GitHub repository.

## Install the package

```bash
npm i github:DasRed/komoot-client#semver:^1.5.0
```

Your `package.json` then contains:

```json
"dependencies": {
    "@dasred/komoot-client": "github:DasRed/komoot-client#semver:^1.5.0"
}
```

`semver:^1.5.0` makes npm pick the newest matching release tag instead of whatever is on `main`.

> [!NOTE]
> Releases are also published to GitHub Packages (`npm.pkg.github.com`). There npm needs a GitHub token in `.npmrc`
> even for reading. Installing from the repository works without a token.

## Requirements

| What    | Version   | Why                                                          |
|---------|-----------|--------------------------------------------------------------|
| Node.js | 22.6+     | Required in `engines`; the client uses the built-in `fetch`  |
| Git     | any       | npm fetches the package from the repository via Git          |
| komoot  | account   | With email address and password                              |

The package is pure ESM and has no further dependencies.
