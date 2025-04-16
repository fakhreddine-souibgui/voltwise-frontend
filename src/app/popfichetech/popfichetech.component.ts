import { Component,Inject  } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-popfichetech',
  imports: [MatDialogModule],
  templateUrl: './popfichetech.component.html',
  styleUrl: './popfichetech.component.css'
})
export class PopfichetechComponent {
  constructor(
    public dialogRef: MatDialogRef<PopfichetechComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; ficheImage: string }
  ) {}

  closePopup(): void {
    this.dialogRef.close();
  }
}
