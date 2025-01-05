import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tea } from './models/teaModel';
import { TeadataService } from './services/teadata.service';
import { TeaFormComponent } from './tea-form/tea-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TeaFormComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  selectedTea: Tea | undefined = undefined;
  teas: Tea[] | null = null;
  message: string | undefined = undefined;

  constructor(private teaService: TeadataService) {}

  deleteTea(tea: Tea) {
    if (tea.id) {
      this.teaService.deleteTea(tea.id).subscribe({
        next: (data: Tea) => {
          const index = this.teas!.findIndex((t) => t.id === data.id);
          this.teas!.splice(index, 1);
          this.message = 'Successfully deleted the tea!';
        },
        error: (error: any) => console.error(error),
      });
    }
  }

  setModifyTea(tea: Tea) {
    this.selectedTea = { ...tea }; // Using spread operator for immutability
  }

  setNewTea() {
    this.selectedTea = {
      id: undefined,
      name: '',
      origin: '',
      flavor: '',
      caffeine: 'None',
      price_per_ounce: 0,
      image: ''
    };
  }

  ngOnInit(): void {
    this.teaService.getTeas().subscribe({
      next: (data: Tea[]) => (this.teas = data),
      error: (error) => console.log(error),
    });
  }

  saveTea(tea: Tea) {
    if (tea.id == undefined) {
      this.teaService.addTea(tea).subscribe({
        next: (data: Tea) => {
          this.teas!.push(data);
          this.selectedTea = undefined;
          this.message = 'Successfully added a new tea!';
        },
        error: (error: Error) => console.log(error.message),
      });
    } else {
      this.teaService.modifyTea(tea).subscribe({
        next: (data: Tea) => {
          let index = this.teas!.findIndex((t) => t.id == data.id);
          this.teas![index] = data;
          this.selectedTea = undefined;
          this.message = 'Successfully updated the tea!';
        },
        error: (error: Error) => console.log(error.message),
      });
    }
  }
}
