import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementCataleg } from '../../models/element.model';
import { TargetaElementComponent } from '../targeta-element/targeta-element.component';
import { BarraCercaComponent } from '../barra-cerca/barra-cerca.component';

@Component({
  selector: 'app-llista-elements',
  standalone: true,
  imports: [CommonModule, TargetaElementComponent, BarraCercaComponent],
  templateUrl: './llista-elements.component.html',
  styleUrls: ['./llista-elements.component.scss']
})
export class LlistaElementsComponent {

  elements: ElementCataleg[] = [];

  filtrar(text: string) {
    console.log('Filtrar:', text);
  }

  trackById(index: number, item: ElementCataleg): string {
    return item.id;
  }
}