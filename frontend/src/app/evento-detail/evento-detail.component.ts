import { Component, OnInit, Input } from '@angular/core';
import { Evento } from '../evento';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EventoService }  from '../evento.service';

@Component({
  selector: 'app-evento-detail',
  templateUrl: './evento-detail.component.html',
  styleUrls: ['./evento-detail.component.css']
})
export class EventoDetailComponent implements OnInit {
  @Input() evento: Evento;

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private location: Location
  ) {}
  
  getEvento(): void {
    // JavaScript (+) operator converts the string to a number, which is what a hero id should be.
    const id = +this.route.snapshot.paramMap.get('id');
    this.eventoService.getEvento(id)
      .subscribe(evento => this.evento = evento);
  }

  save(): void {
    this.eventoService.updateEvento(this.evento)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getEvento();
  }

}
