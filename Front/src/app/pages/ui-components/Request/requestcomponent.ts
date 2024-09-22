import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Request } from 'src/app/models/request.model';
import { RequestService } from 'src/app/services/request.service';
import { WorkflowService } from 'src/app/services/workflow.service';
import { RequestDTO } from 'src/app/models/request-dto.model';
import { TaskDTO } from 'src/app/models/task-dto.model';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
})
export class AppRequestComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'idProcess', 'object', 'addedDateRequest', 'actions'];
  requests: RequestDTO[] = [];
  workflows: any[] = [];
  selectedRequest: Request = new Request();
  newRequest: Request = new Request();
  displayDialog: boolean = false;
  isNewRequest: boolean = false;
  displayCompleteDialog: boolean = false;

  constructor(
    private requestService: RequestService,
    private workflowService: WorkflowService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadRequests();
    this.loadWorkflows();
  }

  loadWorkflows() {
    this.workflowService.getWorkflows().subscribe(data => {
      this.workflows = data;
    });
  }

  loadRequests() {
    this.requestService.getAllRequests().subscribe(data => {
      this.requests = data.map(request => ({
        ...request,
        addedDateRequest: request.addedDateRequest ? new Date(request.addedDateRequest).toISOString() : ''
      }));
    });
  }

  onRowSelect(event: any) {
    this.isNewRequest = false;
    this.selectedRequest = { ...event };
    this.displayDialog = true;
  }

  showDialogToAdd() {
    this.isNewRequest = true;
    this.newRequest = new Request();
    this.displayDialog = true;
  }

  createRequest() {
    const requestDTO: RequestDTO = {
      idRequest: null,
      fullName: this.newRequest.fullName,
      object: this.newRequest.object,
      addedDateRequest: this.newRequest.addedDateRequest.toISOString(),
      idProcess: this.newRequest.idProcess
    };

    this.requestService.createRequest(requestDTO).subscribe(
      () => this.loadRequests(),
      (error) => console.error('Create Request Error:', error)
    );
    this.displayDialog = false;
  }

  updateRequest(request: Request) {
    const requestDTO: RequestDTO = {
      idRequest: request.idRequest,
      fullName: request.fullName,
      object: request.object,
      addedDateRequest: new Date(request.addedDateRequest).toISOString(),
      idProcess: request.idProcess
    };

    this.requestService.updateRequest(request.idRequest!, requestDTO).subscribe(
      () => this.loadRequests(),
      (error) => console.error('Update Request Error:', error)
    );
    this.displayDialog = false;
  }

  deleteRequest(id: number | null) {
    if (id !== null) {
      this.requestService.deleteRequest(id).subscribe(() => this.loadRequests());
    }
  }

  // completeTask() {
  //   if (this.selectedRequest.processInstanceId) {
  //     this.requestService.completeTask(this.selectedRequest.processInstanceId).subscribe(
  //       response => console.log('Task completed successfully', response),
  //       error => console.error('Error completing task:', error)
  //     );
  //     this.displayCompleteDialog = false;
  //   }
  // }
  completeTask() {
    const processInstanceId = this.selectedRequest.processInstanceId;
    if (!processInstanceId) {
      console.log('Process Instance ID is required');
      return;
    }
    // Call the service to complete the task using processInstanceId
    this.requestService.completeTask(processInstanceId).subscribe((response) => {
      console.log('Task completed successfully:', response);
    },
    (error) => {
      console.error('Error completing task:', error);
    });
    this.displayCompleteDialog = false;
  }

  cancelEdit() {
    this.displayDialog = false;
  }

  getWorkflowTitle(idProcess: number | null | undefined): string {
    if (idProcess === undefined || idProcess === null) {
      return 'Unknown';
    }
    const workflow = this.workflows.find(wf => wf.idProcess === idProcess);
    return workflow ? workflow.title : 'Unknown';
  }
}
