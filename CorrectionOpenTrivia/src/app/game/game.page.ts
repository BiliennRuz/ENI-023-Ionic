import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Answer } from '../models/answer';
import { Question } from '../models/question';
import { OpenTriviaService } from '../open-trivia.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  pseudo: string = '';
  difficulty: string = 'easy';
  nextQuestion: boolean = false;
  listQuestions: any[] = [];
  currentQuestion: Question;
  indexQuestion: number = 0;
  score: number = 0;
  endGame: boolean = false;
  saveInfos: string = 'false';
  
  constructor(private toastCtrl: ToastController, 
    private openTriviaSrv: OpenTriviaService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.pseudo = this.activatedRoute.snapshot.params.pseudo;
    this.difficulty = this.activatedRoute.snapshot.params.difficulty;
    this.score = this.activatedRoute.snapshot.params.score;
    this.saveInfos = this.activatedRoute.snapshot.params.saveInfos;
    this.loadListQuestions();
  }

  async speak() {
    if (this.currentQuestion.question) {
      await TextToSpeech.speak({
        text: this.currentQuestion.question,
        lang: 'en-US',
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        category: 'ambient',
      });
    }
  }

  async loadListQuestions() {
    try {
      this.listQuestions = await this.openTriviaSrv.getQuestions(this.difficulty);
      this.loadCurrentQuestion();
    } catch (error) {
      this.showToast('Erreur : ' + error);
    }
  }

  loadCurrentQuestion() {
    let question = this.listQuestions[this.indexQuestion];
    let answers: Answer[] = [];
    answers.push(new Answer(question.correct_answer, true));
    question.incorrect_answers.forEach(element => {
      answers.push(new Answer(element, false));
    });
    answers.sort((a, b) => 0.5 - Math.random());
    this.currentQuestion = new Question(question.category, question.type, question.difficulty, question.question, answers);
  }

  async loadNextQuestion() {
    if (this.indexQuestion < this.listQuestions.length - 1) {
      this.nextQuestion = false;
      this.indexQuestion++;
      this.loadCurrentQuestion();
    }
  }

  async answer(response: Answer) {
    if (response.correct && !this.nextQuestion) {
      this.score++;
      if (this.saveInfos == 'true') {
        await Preferences.set({ key: 'score', value: this.score.toString() });
      }
    }
    this.nextQuestion = true;
    this.showToast('Votre r??ponse est : ' + response.answer);
    if (this.indexQuestion === this.listQuestions.length - 1) {
      this.endGame = true;
      this.showToast('Bien jou?? ! Votre score est de : ' + this.score + ' points !');
    }
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message : msg,
      position: 'bottom',
      duration: 5000
    });
    toast.present();
  }

  goToScore() {
    this.router.navigate(['/score', this.score]);
  }
}
