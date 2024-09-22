import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { RequestDTO } from '../models/request-dto.model';
import { TaskDTO } from '../models/task-dto.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = 'http://localhost:8096/api/requests';

  constructor(private http: HttpClient) { }

  getAllRequests(): Observable<RequestDTO[]> {
    return this.http.get<RequestDTO[]>(`${this.baseUrl}/AllRequests`);
  }

  createRequest(requestDTO: RequestDTO): Observable<RequestDTO> {
    return this.http.post<RequestDTO>(`${this.baseUrl}/AddRequest`, requestDTO);
  }
 
  updateRequest(id: number, request: RequestDTO): Observable<RequestDTO> {
    return this.http.put<RequestDTO>(`${this.baseUrl}/UpdateRequest/${id}`, request);
  }

  deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteRequest/${id}`);
  }
  getTasks(processInstanceId: string): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(`${this.baseUrl}/tasks/${processInstanceId}`);
  }

  completeTask(processInstanceId: string): Observable<any> {
    const url = `${this.baseUrl}/complete-task/${processInstanceId}`;
    return this.http.post<any>(url, {}).pipe(
      map(response => {
        console.log('Task completed successfully:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error completing task:', error);
        return throwError(error);
      })
    );
  }}
