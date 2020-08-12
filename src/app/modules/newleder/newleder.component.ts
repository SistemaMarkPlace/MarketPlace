import { Component, OnInit } from '@angular/core';
import{Path} from '../../config.js';

@Component({
  selector: 'app-newleder',
  templateUrl: './newleder.component.html',
  styleUrls: ['./newleder.component.css']
})
export class NewlederComponent implements OnInit {
  path:String=Path.url;

  constructor() { }

  ngOnInit(): void {
  }

}
