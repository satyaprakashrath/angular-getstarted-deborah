import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.css"],
})
export class ProductListComponent implements OnInit {
  pageTitle: String = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  private _listFilter: string = "";
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  errorMessage : string='';
  sub!: Subscription;

  constructor(private productService: ProductService) {}

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log("In setter:", value);
    this.filteredProducts = this.performFilter(value);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next : products => {
        this.products=products;
        this.filteredProducts = this.products;
      },
      error : err =>  this.errorMessage = err
    });
    
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLowerCase().includes(filterBy)
    );
  }

  onRatingClicked(message: string): void {
    this.pageTitle = "Product List :" + message;
  }

  onDestroy(){
    this.sub.unsubscribe()
  }
  
}
