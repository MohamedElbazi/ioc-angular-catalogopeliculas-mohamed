import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-barra-cerca',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <input
      type="text"
      [(ngModel)]="text"
      (input)="onInput()"
      placeholder="Cerca pel·lícules..."
    />
  `
})
export class BarraCercaComponent {

  text: string = '';

  @Output() cerca = new EventEmitter<string>();

  onInput() {
    this.cerca.emit(this.text);
  }
}