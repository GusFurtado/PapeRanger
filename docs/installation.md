# Installation

You need Docker with Compose.

```sh
mkdir paperanger && cd paperanger
curl -O https://raw.githubusercontent.com/GusFurtado/PapeRanger/main/docker-compose.yml
curl -o .env https://raw.githubusercontent.com/GusFurtado/PapeRanger/main/.env.example
mkdir documents          # or point DOCUMENTS_PATH in .env at an existing folder
docker compose up -d
```

Then open http://localhost:8080.

Create the documents folder yourself before starting. If Docker creates it, it
belongs to root, and PapeRanger (which never runs as root) can't write to it.

`latest` is the newest release. To stay on one version, use its tag instead, e.g.
`ghcr.io/gusfurtado/paperanger:0.5.0`, or `:0.5` to also get its 0.5.x bug-fix releases.

## Configuration

Set these in `.env`, next to `docker-compose.yml`:

| Variable         | Default       | What it does                                                                        |
|------------------|---------------|-------------------------------------------------------------------------------------|
| `DOCUMENTS_PATH` | `./documents` | Folder on the host where your documents are kept (the volume).                      |
| `PORT`           | `8080`        | Port PapeRanger is served on.                                                       |
| `PUID` / `PGID`  | `1000`        | User and group the app runs as, which own every file it writes. Use `id -u` / `id -g`. |
| `ENCRYPTION_KEY` | *(empty)*     | Enables encryption. See [Encryption](encryption.md).                                                      |
| `USERNAME`       | *(empty)*     | Login name. Together with `PASSWORD`, turns the login on. See [Security](security.md). |
| `PASSWORD`       | *(empty)*     | Login password.                                                                     |

To use a Docker secret instead of an environment variable, set `ENCRYPTION_KEY_FILE`
or `PASSWORD_FILE` to the secret's path inside the container.

`docker compose` also reads variables from your shell, and they win over `.env`. If
your shell exports a `USERNAME` of its own, PapeRanger will refuse to start (it has no
`PASSWORD`) until you unset it or give it one.

## Upgrading from Papelada

PapeRanger was called Papelada up to v0.4. Your documents folder carries over as it is:

1. In your `docker-compose.yml`, change the image to `ghcr.io/gusfurtado/paperanger:latest`
   (the old `ghcr.io/gusfurtado/papelada` image gets no more releases). Renaming the
   service and `container_name` to `paperanger` is optional.
2. Run `docker compose up -d`.

On its first start, PapeRanger renames the app's folder inside your documents folder
from `.papelada/` to `.paperanger/`. Nothing else in the folder changes, and the
encryption key, if you use one, stays the same. Everyone is signed out once, and the
installed app on your phone keeps working, though you may need to add it to the home
screen again to see the new name and icon.
