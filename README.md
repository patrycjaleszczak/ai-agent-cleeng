# ai-agent-cleeng

## API tests with Playwright

Generated from `schema.yml` using a small generator.

### Generate tests

```bash
npm run gen:api
```

This will create files under `tests/api/generated` (one per path+method).

### Configure base URL and auth

- `BASE_URL` or `PW_BASE_URL`: API server base URL (defaults to first server in `schema.yml`)
- `AUTH_HEADER`: Optional full Authorization header value, e.g. `Bearer <token>`
- For path params, set env vars as `PATH_<PARAM_NAME_IN_UPPERCASE>`, e.g. for `/resource/{id}` set `PATH_ID=123`.

### Staging configuration

A sample `.env.staging` is provided to run tests against staging:

```
BASE_URL=https://api.staging.stardustlab.com
AUTH_HEADER=Bearer <publisher_token>
```

Create `.env.staging` with your token. The config auto-loads `.env` and then `.env.staging` if present.

### Run tests

```bash
# using staging env file
npm run test:api

# or explicitly via env vars
BASE_URL="https://api.staging.stardustlab.com" AUTH_HEADER="Bearer <token>" npm run test:api
```

The tests perform basic 2xx/3xx assertions. Customize each generated file under `tests/api/generated` to add contract-specific checks.

### Installing dependencies (node_modules)

The `node_modules/` directory is not committed. To install dependencies locally:

```bash
npm ci
# or
npm install
```

This will recreate `node_modules/` based on `package.json` (and lockfile if present).

