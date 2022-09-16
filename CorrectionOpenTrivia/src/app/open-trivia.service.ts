import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

  url: string = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) { }

  getQuestions(difficulty: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '?amount=10&difficulty=' + difficulty).toPromise().then((data: any) => {
        if (data.response_code === 0) {
          resolve(data.results);
        } else {
          reject(new Error('Impossible de récupérer les questions ! Vérifiez votre connexion internet.'));
        }
      });
    }); 
  }

  async getQuestionAsync(difficulty: string) {
    let data: any = await this.http.get(this.url + '?amount=2&difficulty=' + difficulty).toPromise();
    if (data.response_code === 0) {
      return data.results;
    }
    return new Error('Impossible de récupérer les questions ! Vérifiez votre connexion internet.');
  }
}
