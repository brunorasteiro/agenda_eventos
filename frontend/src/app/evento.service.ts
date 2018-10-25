import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Evento } from './evento';
import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class EventoService {
  private eventosUrl = 'http://localhost:8000/evento';  // URL to web api
  
  teste: Evento[];

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET eventos from the server */
  getEventos (): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.eventosUrl)
      .pipe(
        tap(_ => this.log('fetched eventos')),
        catchError(this.handleError('getEventos', []))
      );
  }

  /** GET evento by id. Will 404 if id not found */
  getEvento(id: number): Observable<Evento> {
    const url = `${this.eventosUrl}/${id}`;
    return this.http.get<Evento>(url)
      .pipe(
        tap(_ => this.log(`fetched evento id=${id}`)),
        catchError(this.handleError<Evento>(`getEvento id=${id}`))
      );
  }
  
  /** PUT: update the evento on the server */
  updateEvento (evento: Evento): Observable<any> {
    const url = `${this.eventosUrl}/${evento.id}/`;
    return this.http.put(url, evento, httpOptions).pipe(
      tap(_ => this.log(`updated evento id=${evento.id}`)),
      catchError(this.handleError<any>('updateEvento'))
    );
  }

  /** POST: add a new evento to the server */
  addEvento (evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this.eventosUrl}/`, evento, httpOptions).pipe(
      tap((evento: Evento) => this.log(`added evento w/ id=${evento.id}`)),
      catchError(this.handleError<Evento>('addEvento'))
    );
  }

  /** DELETE: delete the evento from the server */
  deleteEvento (evento: Evento | number): Observable<Evento> {
    const id = typeof evento === 'number' ? evento : evento.id;
    const url = `${this.eventosUrl}/${id}`;

    return this.http.delete<Evento>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted evento id=${id}`)),
      catchError(this.handleError<Evento>('deleteEvento'))
    );
  }

  /** Log a EventoService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`EventoService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
