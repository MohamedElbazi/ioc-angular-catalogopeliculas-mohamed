import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Element } from '../../models/element.model';
import { ELEMENTS } from '../../mocks/dades-mock';
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
  elementsOriginals: Element[] = ELEMENTS;  
  elements: Element[] = ELEMENTS;          

  
  filtrar(text: string) {
    this.elements = this.elementsOriginals.filter(element =>
      element.nom.toLowerCase().includes(text.toLowerCase())
    );
  }

 
  trackById(index: number, item: Element): number {
    return item.id;
  }
}