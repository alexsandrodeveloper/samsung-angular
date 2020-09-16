import { Component, OnInit, Output} from '@angular/core';

import {FormGroup, FormControl} from "@angular/forms";

import { Result } from '../results/result.model'
import { Filtro } from './filtro.model'
import {Currency} from './currency.model'

import { ResultService } from '../results/result.service'

@Component({
  selector: 'sam-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() results: Result[]
  @Output() currencies: Currency[] = []
  @Output() showResults: number = 0

  _form: FormGroup

  constructor(private service: ResultService) {
      this._form = new FormGroup({
        numeroDocumento: new FormControl(),
        tipoMoeda: new FormControl(),
        dataInicio: new FormControl(),
        dataFim: new FormControl()})
  }

  ngOnInit(): void {

    if(this.currencies.length === 0) {
      this.service
          .login('admin', 'admin123')
          .subscribe(() => {
                      this.service.getCurrency().subscribe((dados: Currency[]) => this.currencies = dados)}
                     , error => console.error(error))
    }
  }

  search(): void{
    this.service
        .login('admin', 'admin123')
        .subscribe(() => {
                    this.service.results(this.montarFiltro()).subscribe((dados: any[]) => this.results = dados)}
                           ,error => console.error(error))
    this.showResults = 1
    this.clearFiltro()
  }

  private clearFiltro(): void{
    this._form.reset
  }

  clear(): void {
    this.results = null
  }

  private montarFiltro(): Filtro{
    return new Filtro(this._form.get('numeroDocumento').value
                      ,this._form.get('tipoMoeda').value
                      ,this._form.get('dataInicio').value
                      ,this._form.get('dataFim').value)
  }
}
