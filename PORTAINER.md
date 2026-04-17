# Portainer Deployment Notes

## Current Status

The deployment files in this folder are now closer to a Portainer-ready setup:

- the Docker build no longer requires `package-lock.json`
- the Compose stack now uses environment variables instead of hardcoded localhost settings
- the app container runs Prisma migrations before starting
- the Compose file no longer bind-mounts the project directory as if it were a local dev environment

## Important Blocker

This archive still looks incomplete and may not build successfully yet.

Missing items from this extracted package include:

- `src/components`
- `src/lib`
- `src/app/layout.tsx`
- `src/app/page.tsx`

Several existing files import code from those paths, so restore the full source tree before deploying.

## Portainer Steps

1. Upload the full project folder to your server.
2. Make sure the missing source files listed above are present.
3. Copy values from `.env.example` into Portainer environment variables.
4. In Portainer, deploy the stack using `docker-compose.yml`.
5. After the first startup, confirm the app container completed `prisma migrate deploy`.
6. Open your public URL and verify auth, database access, and S3 uploads.

## Recommended Environment Values

- Set `NEXTAUTH_URL` to your real public domain, not `localhost`
- Use a strong `NEXTAUTH_SECRET`
- Use a strong `POSTGRES_PASSWORD`
- Leave `GOOGLE_CREDENTIALS_JSON` empty if OCR is not enabled yet
- Leave SMTP variables empty if you do not need email immediately

## Notes

- If you use a reverse proxy such as Nginx Proxy Manager, point it to the app service port.
- If you want seeded demo accounts, run `npx prisma db seed` manually inside the app container after the stack is healthy.
