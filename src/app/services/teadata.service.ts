import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tea } from '../models/teaModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeadataService {

  url = 'http://localhost:3000/teas';

  constructor(private http: HttpClient) { }

  getTeas(): Observable<Tea[]> {
    return this.http.get<Tea[]>(this.url);
  }

  addTea(tea: Tea): Observable<Tea> {
    return this.http.post<Tea>(this.url, tea);
  }

  modifyTea(tea: Tea): Observable<Tea> {
    return this.http.put<Tea>(`${this.url}/${tea.id}`, tea);
  }

  deleteTea(id: number): Observable<Tea> {
    return this.http.delete<Tea>(`${this.url}/${id}`);
  }
}
