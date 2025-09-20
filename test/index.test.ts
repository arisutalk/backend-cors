// index.test.ts
import { testClient } from "hono/testing";
import { describe, it } from "vitest"; // Or your preferred test runner
import app from "../src/index";

describe.concurrent("Search Endpoint", () => {
    // Create the test client from the app instance
    const client = testClient(app);

    it("should return 200 with CORS header", async ({ expect }) => {
        const res = await client.proxy.$all(
            { header: { url: "http://example.com" } },
            { init: { method: "GET" } }
        );
        // Assertions
        expect(res.status).toBe(200);
        expect(res.headers.get("Access-Control-Allow-Origin")).toBeTruthy();
        expect(res.headers.get("Vary")).toContain("Origin");
    });
});
