import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//learning Angular services

//Types define the shape(model) of data expected from the backend
export type WorkItemStatus = 'Open' | 'InProgress' | 'Done';

export interface WorkItem
{
  id: number;
  title: string;
  status: WorkItemStatus;
  createdAtUtc: string; 
}


@Injectable({ providedIn: 'root' }) //allows class to be created by the Angular DI container
//providedIn: 'root' means Angular makes one shared instance for the whole app (singleton).
export class WorkItemsService {
  private baseUrl = 'http://localhost:5145';//move to env file 

  //Angular injects HttpClient into this service
  constructor(private http: HttpClient) {}

  /**
   * GET /api/work-items
   * Returns an Observable that emits WorkItem[] when the HTTP call completes.
   */
  getAll(): Observable<WorkItem[]> {
    return this.http.get<WorkItem[]>(`${this.baseUrl}/api/work-items`);
  }

  /**
   * POST /api/work-items  body: { title }
   * Returns the created WorkItem from the server.
   */
  create(title: string): Observable<WorkItem> {
    return this.http.post<WorkItem>(`${this.baseUrl}/api/work-items`, { title });
  }

  /**
   * PUT /api/work-items/{id}/status  body: { status }
   * Returns the updated WorkItem.
   */
  updateStatus(id: number, status: WorkItemStatus): Observable<WorkItem> {
    return this.http.put<WorkItem>(`${this.baseUrl}/api/work-items/${id}/status`, { status });
  }

  /**
   * DELETE /api/work-items/{id}
   * Returns an Observable<void> because server returns no content.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/work-items/${id}`);
  }

}
