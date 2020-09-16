import { Component, OnInit, Input } from '@angular/core';

import {Result} from '../result.model'
@Component({
  selector: 'sam-data-result',
  templateUrl: './data-result.component.html',
  styleUrls: ['./data-result.component.css']
})
export class DataResultComponent implements OnInit {

  @Input() results: Result[]
  @Input() showResults: number

  constructor() { }

  ngOnInit(): void {
  }

}
