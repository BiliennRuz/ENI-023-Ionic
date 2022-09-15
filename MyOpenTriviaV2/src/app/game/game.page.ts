import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Answer } from '../models/answer';
import { Question } from '../models/question';
import { AlertController, ToastController } from '@ionic/angular';
import { OpenTriviaService } from '../service/open-trivia.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  pseudo: string = '';
  difficulty: string = 'easy';
  nextQuestion: boolean = false;
  hideForm: boolean = false;
  listQuestions: any[] = [];
  currentQuestion: Question;
  indexQuestion: number = 0;
  score: number = 0;
  endGame: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, 
    private navCtrl: NavController,
    private openTriviaSrv: OpenTriviaService,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.pseudo = this.activatedRoute.snapshot.params.pseudo;
    this.difficulty = this.activatedRoute.snapshot.params.difficulty;
    this.loadListQuestions();
  }

  
  async loadListQuestions() {
    try {
      this.listQuestions = await this.openTriviaSrv.getQuestions(this.difficulty);
      //console.log(this.listQuestions);
      this.loadCurrentQuestion();
    } catch (error) {
      console.log(error);
    }
  }

  loadCurrentQuestion() {
    let question = this.listQuestions[this.indexQuestion];
    console.log(question);
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
    }
    this.nextQuestion = true;
    const toast = await this.toastCtrl.create({
      message : 'Votre réponse est : ' + response.answer,
      position: 'bottom',
      duration: 5000
    });
    toast.present();
    
    if (this.indexQuestion === this.listQuestions.length - 1) {
      this.endGame = true;
      const toast = await this.toastCtrl.create({
        message : 'Bien joué ! Votre score est de : ' + this.score + ' points !',
        position: 'bottom',
        duration: 5000
      });
      toast.present();
    }
  }

  playAgain() {
    this.hideForm = false;
    this.score = 0;
    this.endGame = false;
    this.indexQuestion = 0;
    this.listQuestions = [];
    this.nextQuestion = false;
  }

}
