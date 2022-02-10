import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { IProduct } from "./product";

/*Recommended way of registering service after angular 6
 * earlier it was registered in app.module.ts
 */
@Injectable({
  providedIn: "root",
})
export class ProductService {
  productUrl = "/api/products/products.json";
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap((data) => console.log("All : ", JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  handleError(error : HttpErrorResponse){
    console.log(error.error.message)
    return throwError(error)
  } 

}
