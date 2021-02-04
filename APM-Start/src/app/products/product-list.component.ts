import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "../shared/services/product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']

})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;

    _listFilter: string;
    get listFilter(): string {
      return this._listFilter;
    }

    set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducs = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducs: IProduct[];

    products: IProduct[];

    constructor(private productService: ProductService) {
      //constructor is executed before ngOnInit()
    }

    ngOnInit(): void {
      this.products = this.productService.getProducts();
      this.filteredProducs = this.products;
    }

    performFilter(filteredBy: string): IProduct[] {
      filteredBy = filteredBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filteredBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    onRatingClicked(message: string): void {
      this.pageTitle = 'Product List ' + message;
    }
}