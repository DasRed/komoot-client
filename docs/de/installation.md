---
title: Installation
description: komoot-client per npm direkt aus dem GitHub-Repository installieren. Welche Version von Node.js du brauchst, warum Git nötig ist und dass es reines ESM ist.
order: 10
slug: installation
section: Einstieg
---

Das Paket liegt nicht auf npmjs.com. Am einfachsten installierst du es direkt aus dem GitHub-Repository.

## Paket installieren

```bash
npm i github:DasRed/komoot-client#semver:^1.5.0
```

In deiner `package.json` steht danach:

```json
"dependencies": {
    "@dasred/komoot-client": "github:DasRed/komoot-client#semver:^1.5.0"
}
```

`semver:^1.5.0` sorgt dafür, dass npm den neuesten passenden Release-Tag nimmt und nicht einfach den Stand von `main`.

> [!NOTE]
> Releases landen zusätzlich in GitHub Packages (`npm.pkg.github.com`). Dort braucht npm auch zum Lesen ein
> GitHub-Token in der `.npmrc`. Die Installation aus dem Repository kommt ohne Token aus.

## Voraussetzungen

| Was     | Version  | Warum                                                        |
|---------|----------|--------------------------------------------------------------|
| Node.js | ab 22.6  | So steht es in `engines`; der Client nutzt das eingebaute `fetch` |
| Git     | beliebig | npm lädt das Paket per Git aus dem Repository                |
| komoot  | Konto    | Mit E-Mail-Adresse und Passwort                              |

Das Paket ist reines ESM und hat keine weiteren Abhängigkeiten.
