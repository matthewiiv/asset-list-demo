import { Component, OnInit } from '@angular/core';
import { AssetDataService } from '../asset-data.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-pc-form',
  templateUrl: './pc-form.component.html',
  styleUrls: ['./pc-form.component.scss']
})
export class PcFormComponent implements OnInit {

  assetForm = this.fb.group({
    type: ['', Validators.required],
    name: ['', Validators.required],
    quantity: ['', Validators.required],
    manufacturer: [''],
    model: [''],
    price: [''],
  });

  constructor(private data: AssetDataService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
    this.assetForm.controls['type'].setValue('PC')
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.assetId) {
        this.data.getAsset(params.assetId).subscribe((data: {id: number, type: string, name: string, quantity: number, manufacturer: string, model: string, price: string }) => {
          this.assetForm.patchValue({
            type: data.type,
            name: data.name,
            quantity: data.quantity,
            manufacturer: data.manufacturer,
            model: data.model,
            price: data.price,
          });
        })
      }
    })
  }

  public changeType(value: string) {
    this.router.navigate([`/${value.toLowerCase()}`])
  }

  public onSubmit() {
    this.route.params.subscribe((params) => {
      const formData = this.assetForm.value
      if (params.assetId) {
        this.data.updateAsset(params.assetId, {type: formData.type, name: formData.name, quantity: formData.quantity, manufacturer: formData.manufacturer, model: formData.model, price: formData.price}).subscribe((data) => {
          this.router.navigate(['/'])
        })
      } else {
        this.data.addAsset({type: formData.type, name: formData.name, quantity: formData.quantity, manufacturer: formData.manufacturer, model: formData.model, price: formData.price}).subscribe((data) => {
          this.router.navigate(['/'])
        })
      }
    })
  }
}
