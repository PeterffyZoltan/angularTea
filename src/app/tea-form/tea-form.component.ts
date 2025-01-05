import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tea } from '../models/teaModel';


@Component({
  selector: 'app-tea-form',
  imports: [],
  templateUrl: './tea-form.component.html',
  styleUrl: './tea-form.component.css'
})
export class TeaFormComponent {
  @Input() selectedTea: Tea | undefined = undefined;
  @Output() cancelledForm = new EventEmitter<void>();
  @Output() save = new EventEmitter<Tea>();

  getvalue(event: any): string {
    return event.target.value;
  }

  getnumber(event: any): number {
    return +event.target.value; // Ensure it converts the input to a number
  }

  saveTea() {
    this.save.emit(this.selectedTea);
  }

  cancel() {
    this.cancelledForm.emit();
  }
}
