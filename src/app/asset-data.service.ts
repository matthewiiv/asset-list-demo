import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetDataService {

  constructor(private http: HttpClient) { }

  getAssets() {
    return this.http.get('http://localhost:3000/assets')
  }

  getAsset(id) {
    return this.http.get(`http://localhost:3000/assets/${id}`)
  }

  deleteAsset(id) {
    return this.http.delete(`http://localhost:3000/assets/${id}`)
  }

  addAsset(asset) {
    return this.http.post(`http://localhost:3000/assets`, asset)
  }

  updateAsset(id, asset) {
    return this.http.put(`http://localhost:3000/assets/${id}`, asset)
  }
}
