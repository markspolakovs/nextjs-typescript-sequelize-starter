// Type definitions for next 6.0
// Project: https://github.com/zeit/next.js
// Definitions by: Drew Hays <https://github.com/dru89>
//                 Brice BERNARD <https://github.com/brikou>
//                 James Hegedus <https://github.com/jthegedus>
//                 Resi Respati <https://github.com/resir014>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.6

/// <reference types="node" />

import * as http from "http";
import * as url from "url";

import { Response as NodeResponse } from "node-fetch";

declare module "next" {
    /**
     * Context object used in methods like `getInitialProps()`
     * <<https://github.com/zeit/next.js/issues/1651>>
     */
    export interface NextContext {
        /** path section of URL */
        pathname: string;
        /** query string section of URL parsed as an object */
        query: {
            [key: string]: any
        };
        /** String of the actual path (including the query) shows in the browser */
        asPath: string;
        /** HTTP request object (server only) */
        req?: http.IncomingMessage;
        /** HTTP response object (server only) */
        res?: http.ServerResponse;
        /** Fetch Response object (client only) - from https://developer.mozilla.org/en-US/docs/Web/API/Response */
        jsonPageRes?: NodeResponse;
        /** Error object if any error is encountered during the rendering */
        err?: Error;
    }

    export type NextSFC<P = {}> = NextStatelessComponent<P>;
    export interface NextStatelessComponent<P = {}> extends React.StatelessComponent<P> {
        getInitialProps?: (ctx: NextContext) => Promise<any>;
    }

    export type UrlLike = url.UrlObject | url.Url;

    export interface ServerConfig {
        // known keys
        webpack?: any;
        webpackDevMiddleware?: any;
        poweredByHeader?: boolean;
        distDir?: string;
        assetPrefix?: string;
        configOrigin?: string;
        useFileSystemPublicRoutes?: boolean;

        // and since this is a config, it can take anything else, too.
        [key: string]: any;
    }

    export interface ServerOptions {
        dir?: string;
        dev?: boolean;
        staticMarkup?: boolean;
        quiet?: boolean;
        conf?: ServerConfig;
    }

    export interface Server {
        handleRequest(
            req: http.IncomingMessage,
            res: http.ServerResponse,
            parsedUrl?: UrlLike,
        ): Promise<void>;
        getRequestHandler(): (
            req: http.IncomingMessage,
            res: http.ServerResponse,
            parsedUrl?: UrlLike,
        ) => Promise<void>;
        prepare(): Promise<void>;
        close(): Promise<void>;
        defineRoutes(): Promise<void>;
        start(): Promise<void>;
        run(
            req: http.IncomingMessage,
            res: http.ServerResponse,
            parsedUrl: UrlLike,
        ): Promise<void>;

        render(
            req: http.IncomingMessage,
            res: http.ServerResponse,
            pathname: string,
            query?: {
                [key: string]:
                    | boolean
                    | boolean[]
                    | number
                    | number[]
                    | string
                    | string[];
            },
            parsedUrl?: UrlLike,
        ): Promise<void>;
        renderError(
            err: any,
            req: http.IncomingMessage,
            res: http.ServerResponse,
            pathname: string,
            query?: {
                [key: string]:
                    | boolean
                    | boolean[]
                    | number
                    | number[]
                    | string
                    | string[];
            },
        ): Promise<void>;
        render404(
            req: http.IncomingMessage,
            res: http.ServerResponse,
            parsedUrl: UrlLike,
        ): Promise<void>;
        renderToHTML(
            req: http.IncomingMessage,
            res: http.ServerResponse,
            pathname: string,
            query?: {
                [key: string]:
                    | boolean
                    | boolean[]
                    | number
                    | number[]
                    | string
                    | string[];
            },
        ): Promise<string>;
        renderErrorToHTML(
            err: any,
            req: http.IncomingMessage,
            res: http.ServerResponse,
            pathname: string,
            query?: {
                [key: string]:
                    | boolean
                    | boolean[]
                    | number
                    | number[]
                    | string
                    | string[];
            },
        ): Promise<string>;

        serveStatic(
            req: http.IncomingMessage,
            res: http.ServerResponse,
            path: string,
        ): Promise<void>;
        isServeableUrl(path: string): boolean;
        isInternalUrl(req: http.IncomingMessage): boolean;
        readBuildId(): string;
        handleBuildId(buildId: string, res: http.ServerResponse): boolean;
        getCompilationError(
            page: string,
            req: http.IncomingMessage,
            res: http.ServerResponse,
        ): Promise<any>;
        handleBuildHash(
            filename: string,
            hash: string,
            res: http.ServerResponse,
        ): void;
        send404(res: http.ServerResponse): void;
    }

    export default function next(options?: next.ServerOptions): next.Server;
}

