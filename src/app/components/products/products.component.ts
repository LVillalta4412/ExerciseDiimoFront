import { Component, OnInit } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../models/products.model';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { UsersService } from '../../services/users.service';

const storage = getStorage();
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  form: FormGroup;
  page_size: number = 2;
  page_number: number = 1;
  pageSizeOptions = [5, 10, 15, 20];
  listProducts!: Products[];
  mostrarIMG!: string;
  Imagen: any;
  url!: any;
  DownloadUrl!: string;
  selected: FormControl = new FormControl(null);
  constructor(private userService: UsersService, private fb: FormBuilder, private productsService: ProductsService, private router: Router) {
    this.form = this.fb.group({
      search: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.selected.valueChanges.subscribe((changes: any) => {
      this.Search(changes);
    });
  }

  async Logout() {
    const result = await this.userService.removeToken();
    return result;
  }

  onUpload(id: any, event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.url = event.target?.result;
    }
    this.mostrarIMG = file.name;
    this.Imagen = file;
    this.UploadImage(id)
  }

  UploadImage(id: any) {
    const metadata = {
      contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + this.Imagen.name);
    const uploadTask = uploadBytesResumable(storageRef, this.Imagen, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.updateProductsImage(id, downloadURL)
        });
      }
    );

  }


  handlePage(e: PageEvent): void {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  async updateProductsImage(id: number, downloadURL: string) {
    const data = {
      image: downloadURL
    };
    const result = await this.productsService.UpdateImage(id, data);
    this.getAllProducts();
    return result;
  }

  getAllProducts() {
    this.productsService.getProducts().then((data: any) => {
      this.listProducts = data;
    });
  }

  async deleteProducts(id: number) {
    const trash = await this.productsService.DeleteProductsById(id);
    this.getAllProducts();
    return trash;
  }

  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z0-9]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
      // invalid character, prevent input

    }
  }

  Search(event: any) {
    if (event.target.value.length >= 1) {
      this.productsService.getProductsFilter(event.target.value).then((data: any) => {
        this.listProducts = data;
      });
    } else {
      this.getAllProducts();
    }
  }

  UrlAdd() {
    this.router.navigate(['/products/save']);
  }

  UrlEdit(id: number) {
    this.router.navigate(['/products/edit/' + id]);
  }

  UrlDetails(id: number) {
    this.router.navigate(['/products/details/' + id]);
  }

  UrlUsers() {
    this.router.navigate(['/users']);


  }
}
