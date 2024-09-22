import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workflow } from '../models/workflow.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  private baseUrl = 'http://localhost:8096/api/processes'

  constructor(private http: HttpClient) { }


  getWorkflows(): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(`${this.baseUrl}/AllProcesses`);
  }

  createWorkflow(workflow: Workflow): Observable<Workflow> {
    return this.http.post<Workflow>(`${this.baseUrl}/AddProcess`, workflow);
  }

  updateWorkflow(workflow: Workflow): Observable<Workflow> {
    return this.http.put<Workflow>(`${this.baseUrl}/UpdateProcess/${workflow.idProcess}`, workflow);
  }

  deleteWorkflow(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteProcess/${id}`);
  }}
