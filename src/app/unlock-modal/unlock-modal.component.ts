import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-unlock-modal',
  templateUrl: './unlock-modal.component.html',
  styleUrls: ['./unlock-modal.component.css']
})
export class UnlockModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    
  }

}
