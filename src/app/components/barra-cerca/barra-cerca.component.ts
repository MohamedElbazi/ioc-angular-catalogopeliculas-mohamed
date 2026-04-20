import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra-cerca',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './barra-cerca.component.html',
  styleUrls: ['./barra-cerca.component.scss']
})
export class BarraCercaComponent {
  text: string = '';

  @Output() cercar = new EventEmitter<string>();  

  buscar() {
    this.cercar.emit(this.text);
  }
}