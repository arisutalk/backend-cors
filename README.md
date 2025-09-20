# ArisuTalk CORS Proxy 🌸
- Information: This document is for both humans and AI to understand the project. If you need more details, make a [AGENTS.md](https://agents.md/) file.

Welcome to the ArisuTalk CORS Proxy project! This is a lightweight and efficient solution designed to bypass Cross-Origin Resource Sharing (CORS) restrictions, making it easier to access resources from different domains. Built with [Hono](https://hono.dev/) and optimized for [Cloudflare Workers](https://workers.cloudflare.com/), it provides a fast and reliable way to handle cross-origin requests. 🚀

## Features

-   **Lightweight & Fast:** Built with Hono for minimal overhead and high performance.
-   **CORS Bypass:** Seamlessly handles cross-origin requests.
-   **Cloudflare Workers Ready:** Easily deployable to Cloudflare Workers for global availability and scalability.
-   **Configurable:** Simple configuration for target origins and other settings.

## Getting Started
To get this CORS proxy up and running, follow these steps:

```sh
# Install dependencies
pnpm install

# Run the development server
pnpm dev

# Deploy to Cloudflare Workers
pnpm deploy

# Run tests
pnpm test
```

## How it Works

This proxy forwards incoming requests to a specified target URL, adding the necessary CORS headers to allow cross-origin access. You can configure the target URL and other settings in `wrangler.jsonc` and `src/index.ts`.

## Project Structure

```
src/
    ├── index.ts      # Main application entry point
    ├── route.ts     # Route definitions
    └── platform/      # Platform-specific code (Cloudflare Workers)
tests/              # Test cases
public/         # Static assets
```

## License

Apache-2.0, see [LICENSE](./LICENSE) for details.


## Code Style Guide 🦄✨

To keep our code super neat and sparkly, please follow these rules:

- **JavaScript:**
    - Avoid. Use TypeScript instead!
    - If you must, follow the same rules as TypeScript.
    - Use JSDoc comments, especially for functions.
    - Do not use common types like `Object`, `Any`. Use specific types.

- **TypeScript:**
    - Name files and folders in `kebab-case`.
    - Use `camelCase` for variables and functions, `PascalCase` for classes and types.
    - Write JSDoc comments as much as possible. Especially, add comments `@fires` and `@listens` for event-related functions.

- **Hono:**
    - MAKE a schema for each endpoint. Check out the route.ts file for examples. It is needed for generating OpenAPI docs.
    - Use middleware for common tasks like authentication, logging, etc.
    - Keep route handlers focused on a single task. We got the serverless power!
    - [Use chaining for all middleware and handlers](https://hono.dev/docs/helpers/testing), like `app.use(...).get(...).post(...)`.
      
- **Commit Messages:**
    - Use Conventional Commits style. Check out [conventionalcommits.org](https://www.conventionalcommits.org/en/v1.0.0/) for details.

- **Review:**
    - PRs should be reviewed by at least one friend(AI friend is friend too) before merging!

Let’s keep everything tidy and readable so everyone can enjoy coding together~! (｡•̀ᴗ-)✧
