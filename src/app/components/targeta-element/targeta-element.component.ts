import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Element } from '../../models/element.model';

@Component({
  selector: 'app-targeta-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './targeta-element.component.html',
  styleUrls: ['./targeta-element.component.scss']
})
export class TargetaElementComponent {
  @Input() element!: Element;  // Recibirá cada elemento desde el componente padre
}