import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent implements OnInit {

  producttt: Product = new Product();
  updating: boolean = false;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>
        this.productService.get(params.idOrName).subscribe(
          productitem => {
            console.log(productitem);
            this.producttt = productitem || new Product();
          }
        )
    );
  }

  onFormSubmit(form: NgForm): void {
    this.updating = true;
    if (this.producttt.id === null || this.producttt.id === 0) {
      this.productService.create(this.producttt);
      this.router.navigate(['product']);
    } else {
      this.productService.update(this.producttt).subscribe(
        () => this.router.navigate(['product'])
      );
    }
  }

  delete(): void {
    this.productService.remove(this.producttt);
    this.router.navigate(['product']);
  }


}
