import { Component } from '@angular/core';
import { Good } from './good/good';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { GoodDialogResult, GoodDialogComponent } from './good-dialog/good-dialog.component';
import { SearchDialogResult, SearchDialogComponent } from './search-dialog/search-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'motlab-order';
  show: boolean = false;
  todo = this.store.collection('todo').valueChanges({ idField: 'id' });
  inProgress = this.store.collection('inProgress').valueChanges({ idField: 'id' });
  inWait = this.store.collection('inWait').valueChanges({ idField: 'id' });
  done = this.store.collection('done').valueChanges({ idField: 'id' });

  constructor(
    private dialog: MatDialog,
    private dialog2: MatDialog,
    private store: AngularFirestore
    ) {}

  drop(event: CdkDragDrop<Good[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });
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
      if (result.delete) {
        this.store.collection(list).doc(good.id).delete();
      } else {
        this.store.collection(list).doc(good.id).update(good);
      }
    });
  }

  newGood(): void {
    const dialogRef = this.dialog.open(GoodDialogComponent, {
      width: '540px',
      data: {
        good: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: GoodDialogResult) => {
        if (result != undefined) {this.store.collection('todo').add(result.good);}});
  }

  previousGood(): void{
    const searchRef = this.dialog2.open(SearchDialogComponent, {
      width: '800px',
      data: {
        good: {}
      },
    });
    searchRef
      .afterClosed()
      .subscribe((result: SearchDialogResult) => {
        if (result != undefined) {this.store.collection('todo').add(result.good);}});
  }

  switchHidden(show: boolean): void{
    if (show){this.show = false;}
    else{this.show = true;}
  }
}
