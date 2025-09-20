import { z } from "@hono/zod-openapi";
import { Hono } from "hono";
import { validator, describeRoute } from "hono-openapi";
import { getConnInfo } from "./platform";

const inputSchema = z
    .object({
        url: z
            .string()
            .describe("The URL to fetch, must be a valid URL-encoded string"),
    })
    .loose();

const route = new Hono().all(
    "/",
    describeRoute({
        summary: "Make a request without cors blocking",
        description:
            "This endpoint allows you to make a request without cors blocking. It returns the response from the requested URL." +
            "\nRequires a `url` header parameter. The URL must be a valid URL-encoded string.",
    }),
    validator("header", inputSchema, (i) => {
        // Check if the URL is valid
        try {
            new URL(decodeURI(i.data.url));
        } catch {
            throw new TypeError(
                "Invalid URL format, must be a valid URL-encoded string."
            );
        }
    }),
    async (c) => {
        //here
        const url = decodeURI(c.req.valid("header").url);
        let newHeaders = new Headers(c.req.header());

        const clientIp =
            c.req.header("CF-Connecting-IP") ||
            getConnInfo(c).remote.address ||
            undefined;

        newHeaders.delete("url");
        newHeaders.set("host", new URL(url).host);
        newHeaders.delete("origin");
        if (clientIp) newHeaders.set("X-Forwarded-For", clientIp);

        // Remove Access-Control-*
        // ...And Sec-fetch-*
        newHeaders.forEach((_, key) => {
            if (key.toLowerCase().startsWith("access-control-"))
                newHeaders.delete(key);
            if (key.toLowerCase().startsWith("sec-fetch-"))
                newHeaders.delete(key);
        });

        const request = await fetch(url, {
            method: c.req.method,
            body:
                c.req.method !== "GET" && c.req.method !== "HEAD"
                    ? await c.req.blob()
                    : undefined,
            headers: newHeaders,
            redirect: "manual",
        });

        const responseHeaders = new Headers(request.headers);

        // Set CORS headers
        responseHeaders.set(
            "Access-Control-Allow-Origin", // Since there might be authorization, we cannot use '*'
            c.req.header("Origin") || "*"
        );
        responseHeaders.set(
            "Access-Control-Allow-Methods",
            "GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE"
        );
        responseHeaders.set(
            "Access-Control-Allow-Headers", // Allow all requested headers
            c.req.header("Access-Control-Request-Headers") || "*"
        );
        responseHeaders.set(
            "Access-Control-Expose-Headers", // Expose all headers
            c.req.header("Access-Control-Request-Headers") || "*"
        );
        responseHeaders.set("Access-Control-Allow-Credentials", "true"); // Allow auth
        responseHeaders.set("Access-Control-Max-Age", "86400"); // 24 hours
        const varies = ["Access-Control-Request-Headers", "Origin"];
        varies.forEach((i) => responseHeaders.append("Vary", i));
        responseHeaders.delete("Content-Security-Policy"); // Remove CSP to allow usage in any website
        responseHeaders.delete("Content-Security-Policy-Report-Only");
        responseHeaders.delete("Clear-Site-Data"); // Remove Clear-Site-Data to prevent clearing client site data

        return new Response(request.body, {
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
        });
    }
);
export default route;
