import { Component, OnInit } from '@angular/core';
import { AssetDataService } from '../asset-data.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-printer-form',
  templateUrl: './printer-form.component.html',
  styleUrls: ['./printer-form.component.scss']
})
export class PrinterFormComponent implements OnInit {
  // Creates form group and adds some validation
  assetForm = this.fb.group({
    type: ['', Validators.required],
    name: ['', Validators.required],
    quantity: ['', Validators.required],
    make: [''],
    colour: [''],
    serial: [''],
  });

  constructor(private data: AssetDataService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
    // Set default asset type
    this.assetForm.controls['type'].setValue('Printer')
  }

  ngOnInit() {
    // Checks whether form is being used to update an existing asset or create a new one
    // Fetches asset data and prepopulates form if necessary
    this.route.params.subscribe((params) => {
      if (params.assetId) {
        this.data.getAsset(params.assetId).subscribe((data: {id: number, type: string, name: string, quantity: number, make: string, colour: string, serial: string }) => {
          this.assetForm.patchValue({
            type: data.type,
            name: data.name,
            quantity: data.quantity,
            make: data.make,
            colour: data.colour,
            serial: data.serial,
          });
        })
      }
    })
  }

  // Changes route when type selection is modified
  public changeType(value: string) {
    this.router.navigate([`/${value.toLowerCase()}`])
  }

  public onSubmit() {
    // Checks whether route params indicate the asset already exists. If so, updates asset data on db, else adds new asset to db
    this.route.params.subscribe((params) => {
      const formData = this.assetForm.value
      if (params.assetId) {
        this.data.updateAsset(params.assetId, {type: formData.type, name: formData.name, quantity: formData.quantity, make: formData.make, colour: formData.colour, serial: formData.serial}).subscribe((data) => {
          this.router.navigate(['/'])
        })
      } else {
        this.data.addAsset({type: formData.type, name: formData.name, quantity: formData.quantity, make: formData.make, colour: formData.colour, serial: formData.serial}).subscribe((data) => {
          this.router.navigate(['/'])
        })
      }
    })
  }
}
