# demo-express-app

This is a simple database-backed Node + Express app for use in the Kubernetes,
Helm, and Helmfile demos in this repo.

## npm scripts

- `dev` - Starts the demo app in dev mode with server reloading after edits.
- `build` - Compiles TypeScript code to JavaScript for direct execution with
  `node`.
- `build:image` - Builds a Docker image containing the demo app.
- `run:image` - Runs the docker image created by `build:image`.
- `stop:image` - Stops and removes the docker image run by `run:image`.

## Service endpoints

### `/healthcheck`

Returns `{"message":"Service is accepting requests."}` if service is able to
respond to requests.

### `/hello`

Logs hello request in database and returns `{"message": "Hello, <name>!"}`.

Accepts an optional parameter of `name`. If not provided, `name` will default to
`"world"`.

### `/history`

Returns all hello requests that have been logged in the database.

## Environment variables

- `DATABASE_CONNECTION_STRING` -
  `postgres://<user>:<password>@<domain_name>:<port>/<database_name>`
