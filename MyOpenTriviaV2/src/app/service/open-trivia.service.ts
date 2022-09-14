import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

  baseUrl: string = "https://opentdb.com";

  constructor(private http: HttpClient) {
    console.log("API Service");
   }

  async getQuestions(difficulty: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + "/api.php?amount=2&difficulty=" + difficulty).toPromise().then((data: any) => {
        console.log(data);
        resolve(data.results);
        reject("Impossible de récupérer l'API : vérifiez votre connexion internet.");
      });
    });
    // return [
    //   {
    //     category: "Entertainment: Japanese Anime & Manga",
    //     type: "multiple",
    //     difficulty: "easy",
    //     question: "In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?",
    //     correct_answer: "The Salamander",
    //     incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"]
    //   },
    //   { 
    //     category: "Entertainment: Video Games", 
    //     type: "boolean", 
    //     difficulty: "medium", 
    //     question: "&quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz", 
    //     correct_answer: "False", 
    //     incorrect_answers: ["True"]
    //   }
    // ];
  }
}
