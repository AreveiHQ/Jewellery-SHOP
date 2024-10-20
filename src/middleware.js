// import ProtectedMiddleware from "./middleware/protectedMiddleware";
// import UserAuth from "./middleware/userAuth";

export default function middleware(request) {
        const path=request.nextUrl.pathname 
        const isPublicPath = path === '/login' || path === '/register'
        const token = request.cookies.get('token')?.value || '';
        if(isPublicPath && token){
                return NextResponse.redirect(new URL('/',request.nextUrl))
        }
        if(!isPublicPath && !token){
                return NextResponse.redirect(new URL('/login',request.nextUrl))
        }
}
export const config ={
        matcher:[
                '/profile',
                '/login',
                '/register',
        ]
}