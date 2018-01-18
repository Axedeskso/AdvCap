import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UnlockModalComponent } from '../unlock-modal/unlock-modal.component';


@Component({
  selector: 'unlock',
  templateUrl: './unlock.component.html',
  styleUrls: ['./unlock.component.css']
})
export class UnlockComponent  implements OnInit{


  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(UnlockModalComponent, {
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}