import { Component, OnInit, Input } from '@angular/core';

import {Result} from './result.model'
//import {ResultService} from './result.service'

@Component({
  selector: 'sam-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input() results: Result[]
  @Input() showResults: number

  constructor() { }

  ngOnInit(): void {}
}
