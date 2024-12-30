import { Component, DirectiveDecorator, Input } from '@angular/core';
import{driver} from '../../driver';
import { CommonModule} from '@angular/common';


@Component({
  selector: 'app-comp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comp.component.html',
  styleUrl: './comp.component.css'
})
export class CompComponent {
  klasi()
  {

    return{'begin':this.vozac?.category =='ASD',//apply begin if vozac?.category == asd
    'adv':this.vozac?.category=='EXPERT',
    'undr':true}
  }

  klasi2()
  {
    if(this.vozac?.category=='ASD')
    {
      return 'begin'
    }
    else
    {
      return 'adv'
    }
  }
  stilovi()
  {
    return 'underline'
  }
  onDrvView() {
    //window.alert("hehe")
    let link:string |undefined;
    //mozhe i var link ='' (js)
    if(this.vozac?.iconUrl)
    {
      link = this.vozac?.iconUrl
    }
    else{
      link="https://bing.com"
    }

    window.open(link,"_blank")
   }

  @Input()
  vozac: driver|undefined;
  
  @Input()
  indeks: number|undefined;
}
