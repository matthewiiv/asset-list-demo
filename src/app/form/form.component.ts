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
  });

  constructor(private data: AssetDataService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {

  }

  // Navigate to relevant form when type selectedTabChange
  
  public changeType(value: string) {
    this.router.navigate([`/${value.toLowerCase()}`])
  }
}
