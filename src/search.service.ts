import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() {
  }

  getResults(searchTerm: string, callback) {
    setTimeout(() => callback(this.getResultsSync(searchTerm)));
  }

  private getResultsSync(searchTerm: string) {
    return [searchTerm, searchTerm];
  }
}
