import { Component } from '@angular/core';
import { HeaderComponent, TodoFormComponent, TodoListComponent } from './components';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, TodoFormComponent, TodoListComponent, FooterComponent]
})
export class AppComponent {
}
