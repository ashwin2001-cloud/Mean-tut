import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export class ErrorInterceptor implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler){
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse)=>{
        console.log(err);
        alert(err.error.message);
        return throwError(()=>err);
      })
    )
  }
}
