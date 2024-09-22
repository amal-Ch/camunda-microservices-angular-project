import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-workflow-dialog',
  templateUrl: './workflow-dialog.component.html',
})
export class WorkflowDialogComponent {

  workflow: any;
  isNewWorkflow: boolean;

  constructor(
    public dialogRef: MatDialogRef<WorkflowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.workflow = data.workflow;
      this.isNewWorkflow = data.isNewWorkflow;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.workflow);
  }
}
