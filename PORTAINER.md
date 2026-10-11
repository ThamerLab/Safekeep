# Portainer Deployment Notes

## Current Status

The deployment files in this folder are now closer to a Portainer-ready setup:

- the Docker build no longer requires `package-lock.json`
- the Compose stack now uses environment variables instead of hardcoded localhost settings
- the app container runs Prisma migrations before starting
- the Compose file no longer bind-mounts the project directory as if it were a local dev environment

## Important Blocker

The previously listed source files are now present on the default branch. However, their presence alone does **not** guarantee that a fresh Docker image builds and starts successfully. Treat this deployment as unverified until you run the full build and authenticate successfully.

## Portainer Steps

1. Upload the full project folder to your server.
2. Verify the repository is fully checked out, and that a local Docker build succeeds.
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
- **Avoid seeded demo accounts on public or shared servers.** If you intentionally need seed data, set unique `SEED_ADMIN_PASSWORD` and `SEED_DEMO_PASSWORD`, review `prisma/seed.ts`, and only then run the seed command.
