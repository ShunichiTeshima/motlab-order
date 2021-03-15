import { Component } from '@angular/core';
import { Good } from './good/good';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { GoodDialogResult, GoodDialogComponent } from './good-dialog/good-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'motlab-order';
  todo: Good[] = [
    {
      request_user: '栗田',
      product: '塩酸',
      order_number: 3,
      note: '特になし',
      company: '和光',
      product_number: 'aaa',
      quantity: '500 mL'
    },
    {
      request_user: '向',
      product: 'イソプロパノール',
      order_number: 1,
      note: '特になし',
      company: '和光',
      product_number: 'aaa',
      quantity: '500 mL'
    },
  ]
  inProgress: Good[] = [];
  inWait: Good[] = [];
  done: Good[] = [];

  constructor(private dialog: MatDialog) {}

  drop(event: CdkDragDrop<Good[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  editGood(list: 'done' | 'todo' | 'inWait' | 'inProgress', good: Good) {
    const dialogRef = this.dialog.open(GoodDialogComponent, {
      width: '270px',
      data: {
        good,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: GoodDialogResult) => {
      const dataList = this[list];
      const goodIndex = dataList.indexOf(good);
      if (result.delete) {
        dataList.splice(goodIndex, 1);
      } else {
        dataList[goodIndex] = good;
      }
    });
  }

  newGood(): void {
    const dialogRef = this.dialog.open(GoodDialogComponent, {
      width: '270px',
      data: {
        good: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: GoodDialogResult) => this.todo.push(result.good));
    console.log(this.todo)
  }
}
