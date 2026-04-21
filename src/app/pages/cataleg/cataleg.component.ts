import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TargetaElementComponent } from '../../components/targeta-element/targeta-element.component';
import { FormulariCercaComponent } from '../../components/formulari-cerca/formulari-cerca.component';
import { ElementService } from '../../services/element.service';

@Component({
  selector: 'app-cataleg',
  standalone: true,
  imports: [CommonModule, TargetaElementComponent, FormulariCercaComponent],
  templateUrl: './cataleg.component.html',
  styleUrls: ['./cataleg.component.scss']
})
export class CatalegComponent implements OnInit {

  constructor(public elementService: ElementService) {}

  ngOnInit() {
    this.elementService.obtenirPopulars();
  }

  get elements() {
    return this.elementService.elements;
  }

  get carregant() {
    return this.elementService.carregant;
  }

  get error() {
    return this.elementService.error;
  }

  get missatge() {
    return this.elementService.missatge;
  }

  buscar(terme: string) {
    // Si el término es vacío, volver a mostrar populares
    if (!terme || terme.trim() === '') {
      this.elementService.obtenirPopulars();
    } else {
      this.elementService.cercar(terme);
    }
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}