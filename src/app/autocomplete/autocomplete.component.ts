import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../../search.service';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit, OnDestroy {
  @ViewChild('input')
  input: ElementRef;
  results: string[] = [];
  requests: string[] = [];
  subscription: Subscription;

  constructor(private searchService: SearchService) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    const input: HTMLInputElement = this.input.nativeElement as HTMLInputElement;

    this.subscription = fromEvent(input, 'input')
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value),
        filter(val => val.length > 1),
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(value => {
        this.searchService.getResultsAsync(value, (results) => {
          this.results = results;
        });
        this.requests.push(value);
      });
  }

}
