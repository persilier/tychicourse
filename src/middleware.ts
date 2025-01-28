import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './config/i18n';

// Create i18n middleware
const intlMiddleware = createIntlMiddleware({
    defaultLocale,
    locales,
    localePrefix: 'always'
});

// List of valid paths in your application
const validPaths = [
    '/dashboard',
    '/settings',
    '/profile',
    '/editor-showcase',
    '/components',
    '/examples',
    '/showcase',
    '/error-pages',
    '/test-error',
    // Add other valid paths here
];

// List of public pages that don't require authentication
const publicPages = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/error-pages',
    '/not-found',
    '/'
];

export default async function middleware(request: NextRequest) {
    // Get the pathname from the URL
    const pathname = request.nextUrl.pathname;
    const locale = pathname.split('/')[1]; // Get locale from URL
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');

    // Handle i18n first
    const response = await intlMiddleware(request);

    // Check if the path exists (excluding dynamic routes and public pages)
    const isValidPath = validPaths.some(path => 
        pathnameWithoutLocale === path || 
        pathnameWithoutLocale.startsWith(`${path}/`)
    );

    // If the path is not valid and not a public page, show 404
    const isPublicPage = publicPages.some(path => 
        pathnameWithoutLocale === path || 
        pathnameWithoutLocale.startsWith(`${path}/`)
    );

    if (!isValidPath && !isPublicPage) {
        // Return 404 response
        return NextResponse.rewrite(new URL('/not-found', request.url));
    }

    // If it's a public page, allow access
    if (isPublicPage) {
        return response;
    }

    // Get the token from session or cookie
    const token = request.cookies.get('token')?.value;

    // If no token and trying to access protected route, redirect to login
    if (!token) {
        const loginUrl = new URL(`/${locale}/login`, request.url);
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
        
        // Create response with redirect
        const redirectResponse = NextResponse.redirect(loginUrl);
        
        // Copy all locale-handling headers from the i18n middleware response
        response.headers.forEach((value, key) => {
            redirectResponse.headers.set(key, value);
        });
        
        return redirectResponse;
    }

    // Token exists, verify it here if needed
    try {
        // Add your token verification logic here
        return response;
    } catch (error) {
        // If token is invalid, redirect to login
        const loginUrl = new URL(`/${locale}/login`, request.url);
        
        // Create response with redirect
        const redirectResponse = NextResponse.redirect(loginUrl);
        
        // Copy all locale-handling headers from the i18n middleware response
        response.headers.forEach((value, key) => {
            redirectResponse.headers.set(key, value);
        });
        
        return redirectResponse;
    }
}

export const config = {
    // Skip all paths that should not be internationalized or protected
    matcher: ['/((?!api|_next|.*\\..*).*)']
};
