/**
 * @fileoverview Platform-specific utilities for serverless environments.
 * This module provides functions to retrieve connection information
 * such as client IP address and TLS status in a platform-agnostic manner.
 * Write platform-specific imports here, not in the main codebase.
 */
export { getConnInfo } from "hono/cloudflare-workers";
