import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { AssetDataService } from '../asset-data.service';
import { Router } from "@angular/router";

export interface Asset {
  id: number;
  type: string;
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // Define columns for various asset types
  displayedColumns: string[] = ['type', 'name', 'quantity', 'delete', 'edit'];
  displayedVanColumns: string[] = ['type', 'name', 'quantity', 'make', 'model', 'regNumber', 'delete', 'edit'];
  displayedCarColumns: string[] = ['type', 'name', 'quantity', 'make', 'model', 'regNumber', 'delete', 'edit'];
  displayedPCColumns: string[] = ['type', 'name', 'quantity', 'manufacturer', 'model', 'price', 'delete', 'edit'];
  displayedPrinterColumns: string[] = ['type', 'name', 'quantity', 'make', 'colour', 'serial', 'delete', 'edit'];

  public assets;

  // Define custom filter that modifies displayed asset list based on type property

  public filterAssets(event) {
    const filterValue = event.tab.textLabel;
    this.assets.filterPredicate = function(data, filter: string): boolean {
      return data.type.includes(filter);
    };
    if(filterValue === 'All') {
      this.assets.filter = '';
    } else {
      this.assets.filter = filterValue.slice(0, -1)
    }
  }

  @ViewChild(MatSort) sort: MatSort;

  constructor(private data: AssetDataService, private router: Router) { }

  // Remove asset from db then get and render modified asset list

  public deleteAsset = (id: string) => {
    this.data.deleteAsset(id).subscribe((data) => {
      this.data.getAssets().subscribe((assetData: {id: number, type: string, name: string, quantity: number }[]) => {
        this.assets = new MatTableDataSource(assetData);
        this.assets.sort = this.sort;
      });
    })
  }

  // Get asset list and use to create material design table. Add column sort functionality

  ngOnInit() {
    this.data.getAssets().subscribe((data: {id: number, type: string, name: string, quantity: number }[]) => {
      this.assets = new MatTableDataSource(data);
      this.assets.sort = this.sort;
    });
  }
}
