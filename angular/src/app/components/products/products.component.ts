import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Http} from "@angular/http";
import {LocalApiService} from "../../services/local-api.service";
import {LocalHelperService} from "../../services/local-helper.service";
import {LocalBootstrapService} from "../bootstrap/local-bootstrap.service";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
    products: { id: String, title: String, description: String, price: Number, imagePath: String }[][];
    imagesUrl: String;

    constructor(private pageTitle: Title,
                private localApi: LocalApiService,
                private localBootstrap: LocalBootstrapService) {
    }

    ngOnInit() {
        this.pageTitle.setTitle('Products');
        this.getAllProducts();
        this.imagesUrl = this.localApi.getProductImageUrl();
    }

    deleteProduct(id) {
        this.localBootstrap.confrimModal({
            message: 'Are you sure from delete product ?',
            success: () => {
                this.localApi.deleteProduct(id).subscribe(() => {
                    this.getAllProducts();
                });
            }
        })
    }

    getAllProducts() {
        this.localApi.getAllProducts().subscribe(products => {
            this.products = LocalHelperService.chunkArray(products, 3);
            console.log(this.products);
        });
    }

//
}
