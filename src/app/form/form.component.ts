import { Component, OnInit } from '@angular/core';
import { AssetDataService } from '../asset-data.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  assetForm = this.fb.group({
    type: ['', Validators.required],
    name: ['', Validators.required],
    quantity: ['', Validators.required],
  });

  constructor(private data: AssetDataService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.assetId) {
        this.data.getAsset(params.assetId).subscribe((data: {id: number, type: string, name: string, quantity: number }) => {
          this.assetForm.patchValue({
            type: data.type,
            name: data.name,
            quantity: data.quantity,
          });
        })
      }
    })
  }

  public changeType(value: string) {
    this.router.navigate([`/${value.toLowerCase()}`])
  }

  onSubmit() {
    this.route.params.subscribe((params) => {
      const formData = this.assetForm.value
      if (params.assetId) {
        this.data.updateAsset(params.assetId, {type: formData.type, name: formData.name, quantity: formData.quantity}).subscribe((data) => {
          this.router.navigate(['/'])
        })
      } else {
        this.data.addAsset({type: formData.type, name: formData.name, quantity: formData.quantity}).subscribe((data) => {
          this.router.navigate(['/'])
        })
      }
    })
  }
}
