import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // <-- Import forms
import { WorkflowService } from 'src/app/services/workflow.service';
import { WorkflowDialogComponent } from '../workflow-dialog/workflow-dialog.component';
import { Workflow } from 'src/app/models/workflow.model';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
})
export class AppWorkflowComponent implements OnInit {
  workflows: any[] = [];
  displayedColumns: string[] = ['title', 'code', 'processKey', 'dateAdded', 'action'];
  selectedWorkflow: any | null = null; // Add this to track the selected workflow
  displayDialog: boolean = false;
  isNewWorkflow: boolean = false;

  constructor(private workflowService: WorkflowService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadWorkflows();
  }

  loadWorkflows() {
    this.workflowService.getWorkflows().subscribe({
      next: (data: any[]) => {
        this.workflows = data;
      },
      error: (err) => {
        console.error('Error loading workflows', err);
      }
    });
  }

  // Open dialog to add a new workflow
  showDialogToAdd() {
  const dialogRef = this.dialog.open(WorkflowDialogComponent, {
    width: '400px',
    data: { workflow: new Workflow(), isNewWorkflow: true }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.createWorkflow(result);
    }
  });
}

// editWorkflow(workflow: Workflow) {
//   this.selectedWorkflow = { ...workflow };
//   this.displayDialog = true;
//   this.isNewWorkflow = false;
// }

editWorkflow(workflow: Workflow) {
  const dialogRef = this.dialog.open(WorkflowDialogComponent, {
    width: '400px',
    data: { workflow: { ...workflow }, isNewWorkflow: false }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.updateWorkflow(result);
    }
  });
}

onRowSelect(event: any) {
  this.editWorkflow(event.data);
}

createWorkflow(workflow: Workflow) {
  this.workflowService.createWorkflow(workflow).subscribe(() => {
    this.loadWorkflows();
  });
}

updateWorkflow(workflow: Workflow) {
  this.workflowService.updateWorkflow(workflow).subscribe(() => {
    this.loadWorkflows();
  });
}


  // Delete a workflow
  deleteWorkflow(id: number) {
    if (confirm('Are you sure you want to delete this workflow?')) {
      this.workflowService.deleteWorkflow(id).subscribe({
        next: () => {
          this.loadWorkflows();
        },
        error: (err) => {
          console.error('Error deleting workflow', err);
        }
      });
    }
  }
}

