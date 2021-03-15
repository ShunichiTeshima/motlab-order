import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Good } from '../good/good'

@Component({
  selector: 'app-good-dialog',
  templateUrl: './good-dialog.component.html',
  styleUrls: ['./good-dialog.component.css']
})
export class GoodDialogComponent {
  private backupGood: Partial<Good> = { ...this.data.good };

  constructor(
    public dialogRef: MatDialogRef<GoodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GoodDialogData
  ) { }

  cancel(): void {
    this.data.good.product = this.backupGood.product;
    this.data.good.request_user = this.backupGood.request_user;
    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {
  }

}

export interface GoodDialogData {
  good: Partial<Good>;
  enableDelete: boolean;
}

export interface GoodDialogResult {
  good: Good;
  delete?: boolean;
}
