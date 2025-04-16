import { Component ,AfterViewInit,Inject, PLATFORM_ID} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopfichetechComponent } from '../popfichetech/popfichetech.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopformulaireComponent } from '../popformulaire/popformulaire.component';
import { PopdemoComponent } from '../popdemo/popdemo.component';
import { ViewportScroller,CommonModule  } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
/*import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';*/
import { HttpClient } from '@angular/common/http';
import { TranslateModule,TranslateService  } from '@ngx-translate/core';






@Component({
  selector: 'app-home',
  imports: [RouterOutlet,PopfichetechComponent,MatDialogModule,PopformulaireComponent,PopdemoComponent,TranslateModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private translate: TranslateService,@Inject(PLATFORM_ID) private platformId: Object, private dialog: MatDialog , private viewportScroller: ViewportScroller ,http: HttpClient)
   {}

   currentLang = 'fr';
  switchLang(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }

  

  openDialogformulaire() {
    this.dialog.open(PopformulaireComponent, {
      width: '1000px', // ✅ Ajuste la taille de la popup
      height: '700px'
     // panelClass: 'custom-dialog-container' // ✅ Ajoute une classe CSS personnalisée
    });
  }
  /*currentProductIndex = 0;
  
    products = [
      {
        image: "assets/mes images/Voltwise nano.png",
        title: "Nano Box",
        text: "Le Nano Box est le chargeur ultra-rapide parfait pour les cafés, restaurants, beach bars et hôtels. Avec ses câbles Type-C et TIPSY, il recharge tous les smartphones rapidement et en toute sécurité. Compact et élégant, il s’intègre à vos espaces, du comptoir à la terrasse. Grâce à notre application mobile, gérez vos boxes en temps réel et offrez un service moderne qui ravira vos clients.",
        ficheImage: "assets/mes images/fichetechnano.png"
      },
      {
        image: "assets/mes images/Multi-boxes.png",
        title: "Multi boxes",
        text: "Le Multi Boxes révolutionne la recharge dans les espaces publics. Avec ses casiers sécurisés et son écran interactif, il garantit une recharge rapide et fiable pour tous les appareils. Compatible avec Type-C et Tipsy, il s’adapte à tous les besoins. Idéal pour les aéroports, gares ou centres commerciaux, le Multi Boxes allie performance, sécurité et innovation pour une expérience client exceptionnelle. Ses fonctionnalités avancées permettent une gestion facile et une intégration parfaite dans n’importe quel environnement.",
        ficheImage: "assets/mes images/fichetechmulti.png"
      },
      {
        image: "assets/mes images/Mega Charger.png",
        title: "Mega charger",
        text: "Le Mega Charger est la solution ultime pour les événements de toutes tailles. Capable de charger jusqu’à 7 appareils simultanément avec ses câbles Type-C et Tipsy, il offre une compatibilité universelle. Ses caissons sécurisés protègent vos appareils, tandis que son écran interactif permet une navigation intuitive et l’affichage de publicités dynamiques. Parfait pour les organisateurs d’événements qui souhaitent offrir un service de recharge premium à leurs participants .",
        ficheImage: "assets/mes images/fichetechmega.png"
      }
    ];*/
    currentProductIndex = 0;

products = [
  {
    image: "assets/mes images/Voltwise nano.png",
    title: "Nano Box",
    text: "SOLUTIONS.PRODUCT_1.TEXT",
    ficheImageFR: "assets/mes images/fichetechnanofr.png",
    ficheImageEN: "assets/mes images/fichetechnanoen.png"
  },
  {
    image: "assets/mes images/Multi-boxes.png",
    title: "Multi Boxes",
    text: "SOLUTIONS.PRODUCT_2.TEXT",
    ficheImageFR: "assets/mes images/fichetechmultifr.png",
    ficheImageEN: "assets/mes images/fichetechmultien.png"
  },
  {
    image: "assets/mes images/Mega Charger.png",
    title: "Mega Charger",
    text: "SOLUTIONS.PRODUCT_3.TEXT",
    ficheImageFR: "assets/mes images/fichetechmegafr.png",
    ficheImageEN: "assets/mes images/fichetechmegaen.png"
  }
];

  
   // constructor(private dialog: MatDialog , private viewportScroller: ViewportScroller) {}
    onNavClick(target: string): void {
      this.viewportScroller.scrollToAnchor(target);
    }
    
  
    nextProduct() {
      this.currentProductIndex = (this.currentProductIndex + 1) % this.products.length;
    }
  
    openPopup() {
      const product = this.products[this.currentProductIndex];
      const lang = this.translate.currentLang;

  const ficheImage = lang === 'en' ? product.ficheImageEN : product.ficheImageFR;
  
      this.dialog.open(PopfichetechComponent, {
        data: { title: product.title, ficheImage: ficheImage }
      });
    }

    openDialogdemo() {
      this.dialog.open(PopdemoComponent, {
       /* width: '2000px', // ✅ Ajuste la taille de la popup
        height: '550px'*/
       // panelClass: 'custom-dialog-container' // ✅ Ajoute une classe CSS personnalisée
      });
    }
  }
