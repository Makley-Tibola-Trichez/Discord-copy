import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const currentUserAuthenticated = request.cookies.get("token");

	if (!currentUserAuthenticated && !request.url.includes("/login")) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
