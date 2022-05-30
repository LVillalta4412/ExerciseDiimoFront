import { Component, OnInit } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Products } from '../../../models/products.model';
import { UsersService } from '../../../services/users.service';

const storage = getStorage();

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form!: FormGroup;
  id: number | undefined;
  products?: Products[];
  mostrarIMG!: string;
  Imagen: any;
  url!: any;
  DownloadUrl!: string;
  constructor(private userService: UsersService, private fb: FormBuilder, private activeRoute: ActivatedRoute, private productsService: ProductsService, private router: Router) {
    this.form = this.fb.group({
      sku: [""],
      name: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      price: ["", [Validators.required]],
      description: [""]
    });
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data: Params) => {
      this.id = data['id'];
    });
    this.getProducts()
  }

  async Logout() {
    const result = await this.userService.removeToken();
    return result;
  }

  getProducts() {
    this.productsService.getProductsById(Number(this.id)).then((data: any) => {
      this.products = data;
      return this.products;
    });
  }

  async updateProducts() {
    if (this.form.valid) {
      const result = await this.productsService.UpdateProducts(Number(this.id), this.form.value);
      return result;
    } else {
      this.form.markAllAsTouched()
    }
  }

  Goback() {
    this.router.navigate(['/products']);
  }

  onUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.url = event.target?.result;
    }
    this.mostrarIMG = file.name;
    this.Imagen = file;
    this.UploadImage()
  }

  UploadImage() {
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
          this.updateProductsImage(downloadURL)
        });
      }
    );

  }

  async updateProductsImage(downloadURL: string) {
    const data = {
      image: downloadURL
    };
    const result = await this.productsService.UpdateImage(Number(this.id), data);
    return result;
  }

}
