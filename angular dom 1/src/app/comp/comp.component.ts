import { Component, DirectiveDecorator, Input } from '@angular/core';
import{driver} from '../../driver';



@Component({
  selector: 'app-comp',
  standalone: true,
  imports: [],
  templateUrl: './comp.component.html',
  styleUrl: './comp.component.css'
})
export class CompComponent {

  @Input()
  vozac: driver|undefined;
  onDrvView() {
   window.alert("hehe")
  }
  @Input()
  indeks: number|undefined;
}
