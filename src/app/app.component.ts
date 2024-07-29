import { Component } from '@angular/core';
import { HeaderComponent, TodoFormComponent, TodoListComponent } from './components';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, TodoFormComponent, TodoListComponent]
})
export class AppComponent {
}
