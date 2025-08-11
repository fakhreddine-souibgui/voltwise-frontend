import { Component } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WebcamModule } from 'ngx-webcam';
import { Router  } from '@angular/router';


@Component({
  selector: 'app-admin-face-verification',
  imports: [WebcamModule,CommonModule],
  templateUrl: './admin-face-verification.component.html',
  styleUrl: './admin-face-verification.component.css'
})
export class AdminFaceVerificationComponent {
  /* webcamImage: WebcamImage | null = null;
  trigger: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  verifyFace() {
    if (this.webcamImage) {
      const base64Image = this.webcamImage.imageAsBase64;

      this.http.post('http://localhost:5000/verify-face', { image: base64Image }).subscribe(
        (res: any) => {
          if (res.verified) {
            alert("Vérification réussie !");
            // Rediriger vers le dashboard admin
          } else {
            alert("Échec de la reconnaissance faciale !");
          }
        },
        (err) => {
          console.error(err);
          alert("Erreur de connexion avec le serveur IA.");
        }
      );
    }
  }*/
  /*webcamImage: WebcamImage | null = null;
  private trigger: Subject<void> = new Subject<void>();
  verificationResult: boolean | null = null;

    constructor(private http: HttpClient) {}

  triggerObservable = this.trigger.asObservable();

  videoOptions: MediaTrackConstraints = {
    width: { ideal: 640 },
    height: { ideal: 480 },
    facingMode: 'user'
  };

  captureImage() {
    this.trigger.next();
  }
*/
  /*handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    console.log('Image capturée', webcamImage);
  }*/
 /*handleImage(webcamImage: WebcamImage) {
  this.webcamImage = webcamImage;

  const base64Image = webcamImage.imageAsBase64;
  const payload = new FormData();
  payload.append('image', this.base64ToBlob(base64Image), 'capture.jpg');

  this.http.post('http://localhost:5001/verify-face', payload).subscribe({
    next: (res: any) => {
      console.log('Vérification réussie', res);
      // Rediriger ou afficher un message selon res.match
    },
    error: err => {
      console.error('Erreur de vérification', err);
    }
  });
}
base64ToBlob(base64: string): Blob {
  const byteString = atob(base64);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([intArray], { type: 'image/jpeg' });
}
*/
/*verifyFace() {
  if (!this.webcamImage) return;
  const base64Image = this.webcamImage.imageAsBase64;
  const payload = new FormData();
  payload.append('image', this.base64ToBlob(base64Image), 'capture.jpg');

  this.http.post('http://localhost:5001/verify-face', payload).subscribe({
    next: (res: any) => {
      alert(res.match ? '✅ Visage reconnu' : '❌ Visage non reconnu');
    },
    error: err => {
      console.error('Erreur lors de la vérification faciale', err);
    }
  });
}*/
/*verifyFace() {
  if (!this.webcamImage) return;
  const base64Image = this.webcamImage.imageAsBase64;
  const payload = new FormData();
  payload.append('image', this.base64ToBlob(base64Image), 'capture.jpg');

  this.http.post('http://localhost:5001/verify-face', payload).subscribe({
    next: (res: any) => {
      this.verificationResult = res.match;
    },
    error: err => {
      console.error('Erreur lors de la vérification faciale', err);
    }
  });
}
*/
webcamImage: WebcamImage | null = null;
verificationResult: boolean | null = null;
private trigger: Subject<void> = new Subject<void>();
triggerObservable = this.trigger.asObservable();
//adminInfo = JSON.parse(localStorage.getItem('admin') || '{}');
isLoading: boolean = false;

videoOptions = { width: 640, height: 480, facingMode: 'user' };
    constructor(private http: HttpClient, private router: Router) {}

/*captureImage() {
  this.trigger.next();
}

handleImage(webcamImage: WebcamImage) {
  this.webcamImage = webcamImage;
}*/

/*verifyFace() {
  if (!this.webcamImage) return;

  const base64Image = this.webcamImage.imageAsBase64;
  const formData = new FormData();
  formData.append('image', this.base64ToBlob(base64Image), 'capture.jpg');

  this.http.post('http://localhost:5001/verify-face', formData).subscribe({
    next: (res: any) => {
      this.verificationResult = res.match;
    },
    error: (err) => {
      console.error('Erreur lors de la vérification faciale', err);
    }
  });
}*/
/*verifyFace() {
  if (!this.webcamImage) return;

  const base64Image = this.webcamImage.imageAsBase64;
  const formData = new FormData();
  formData.append('image', this.base64ToBlob(base64Image), 'capture.jpg');

  this.http.post('http://localhost:5001/verify-face', formData).subscribe({
    next: (res: any) => {
      if (res.match) {
        alert('✅ Visage reconnu, accès autorisé');
        this.router.navigate(['/adminn']);
      } else {
        alert('❌ Visage non reconnu, accès refusé');
        // optionnel : logout ou autre action
      }
    },
    error: (err) => {
      console.error(err);
      alert('Erreur lors de la vérification faciale');
    }
  });
}*/

/*verifyFace() {
  
    this.trigger.next();
  if (!this.webcamImage) return;

  const base64Image = this.webcamImage.imageAsBase64;
  const payload = new FormData();
  payload.append('image', this.base64ToBlob(base64Image), 'capture.jpg');

  const admin = JSON.parse(localStorage.getItem('admin') || '{}');
  payload.append('reference_image', admin.image);  // ← ici tu ajoutes le nom d’image

  this.http.post('http://localhost:5001/verify-face', payload).subscribe({
    next: (res: any) => {
      this.verificationResult = res.match;
      if (res.match) {
        this.router.navigate(['/adminn']);
      } else {
        alert('❌ Visage non reconnu');
      }
    },
    error: err => {
      console.error('Erreur lors de la vérification faciale', err);
    }
  });
}

base64ToBlob(base64: string): Blob {
  const byteString = atob(base64);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([intArray], { type: 'image/jpeg' });
}*/

// Déclenche la capture
captureAndVerify() {
  this.verificationResult = null;
  this.isLoading = true;
  this.trigger.next(); // Déclenche la capture
}

handleAndVerify(webcamImage: WebcamImage) {
  this.webcamImage = webcamImage;

  const base64Image = webcamImage.imageAsBase64;
  const payload = new FormData();
  payload.append('image', this.base64ToBlob(base64Image), 'capture.jpg');

  const admin = JSON.parse(localStorage.getItem('admin') || '{}');
  if (!admin.image) {
    alert("Image de référence manquante !");
    this.isLoading = false;
    return;
  }
  payload.append('reference_image', admin.image);

  this.http.post('http://localhost:5001/verify-face', payload).subscribe({
    next: (res: any) => {
      this.verificationResult = res.match;
      this.isLoading = false;

      if (res.match) {
        this.router.navigate(['/adminn']);
      } else {
        alert('❌ Visage non reconnu');
      }
    },
    error: err => {
      console.error('Erreur lors de la vérification faciale', err);
      this.isLoading = false;
      alert('Erreur de vérification');
    }
  });
}

base64ToBlob(base64: string): Blob {
  const byteString = atob(base64);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([intArray], { type: 'image/jpeg' });
}



}
