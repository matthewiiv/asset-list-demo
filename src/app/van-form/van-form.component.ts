import { Component, OnInit } from '@angular/core';
import { AssetDataService } from '../asset-data.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-van-form',
  templateUrl: './van-form.component.html',
  styleUrls: ['./van-form.component.scss']
})
export class VanFormComponent implements OnInit {

  assetForm = this.fb.group({
    type: ['', Validators.required],
    name: ['', Validators.required],
    quantity: ['', Validators.required],
    make: [''],
    model: [''],
    regNumber: [''],
  });

  constructor(private data: AssetDataService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
    this.assetForm.controls['type'].setValue('Van')
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.assetId) {
        this.data.getAsset(params.assetId).subscribe((data: {id: number, type: string, name: string, quantity: number, make: string, model: string, regNumber: string }) => {
          this.assetForm.patchValue({
            type: data.type,
            name: data.name,
            quantity: data.quantity,
            make: data.make,
            model: data.model,
            regNumber: data.regNumber,
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
        this.data.updateAsset(params.assetId, {type: formData.type, name: formData.name, quantity: formData.quantity, make: formData.make, model: formData.model, regNumber: formData.regNumber}).subscribe((data) => {
          this.router.navigate(['/'])
        })
      } else {
        this.data.addAsset({type: formData.type, name: formData.name, quantity: formData.quantity, make: formData.make, model: formData.model, regNumber: formData.regNumber}).subscribe((data) => {
          this.router.navigate(['/'])
        })
      }
    })
  }
}
