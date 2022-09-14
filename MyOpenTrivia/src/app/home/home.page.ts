import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { OpenTriviaService } from '../service/open-trivia.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pseudo: string = "";
  level: String = "";
  errorMessage: string = "";
  ErrorIsHidden: boolean = true;
  colorText: string = "blue";
  colorTextError: string = "red";
  formIsHidden: boolean = false;
  questionIsHidden: boolean = false;
  question: string = "";
  reponses: string[] = [""];
  questionSuivanteIsHidden: boolean = false;
  listQuestions: any[] = [];
  numQuestion: number = 0;
  compteurPoints: number = 0;

  
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private openTriviaServ: OpenTriviaService
    ) {}

  async clickMe() {
    // if (this.pseudo.length <3) {
    //   this.ErrorIsHidden = false;
    //   this.showAlertPseudo();
    // } else {
    //   this.ErrorIsHidden = true;
    // }

    // if (this.level=="") {
    //   this.ErrorIsHidden = false;
    //   this.showAlertLevel();
    // } else {
    //   this.ErrorIsHidden = true;
    // }

    if (this.ErrorIsHidden == true) {
      // affichage du bloc question
      this.formIsHidden = true;
      this.questionIsHidden = false;
      // recup des questions
      this.listQuestions = await this.openTriviaServ.getQuestions(this.level);
      // affichage de la question et des réponses
      this.displayQuestions();
    }
  }
  
  displayQuestions() {
    if (this.numQuestion < this.listQuestions.length) {
      // on recupere la question
      this.question = this.listQuestions[this.numQuestion].question;
      // on recupere les mauvaises et la bonne reponse
      var answers = this.listQuestions[this.numQuestion].incorrect_answers;
      answers.push(this.listQuestions[this.numQuestion].correct_answer);
      // on mellange les réponses
      this.reponses = answers.sort(() => Math.random() - 0.5);
      console.log(this.reponses);
    }
  }

  clickRequest() {
    this.questionSuivanteIsHidden = false;
    // on verifier si fin de la liste de question
    if (this.numQuestion < this.listQuestions.length) {
      var textBtnQuestionSuivante = "Question suivante";
      console.log('reponse : ' + this.reponses[this.numQuestion]);
      console.log('reponse vrai : ' + this.listQuestions[this.numQuestion].correct_answer);
      // si bonne réponse
      if (this.reponses[this.numQuestion] == this.listQuestions[this.numQuestion].correct_answer){
        this.compteurPoints++;
        console.log('compteur : ' + this.reponses);
      }
      // on change de question
      this.numQuestion++;
      this.displayQuestions();
    // c'est fini, on rejoue
    } else {
      var textBtnQuestionSuivante = "Rejouer";
      this.numQuestion = 0;
      this.compteurPoints = 0;
    }
  }

  async showAlertPseudo() {
    const alert = await this.alertCtrl.create({
      header: "ALERTE !",
      message: "Veuillez rentrer un pseudo de 3 caractère minimum !",
      buttons: ['OK'],
    });
    alert.present();
  }

  async showAlertLevel() {
    const alert = await this.alertCtrl.create({
      header: "ALERTE !",
      message: "Veuillez selectionner un niveau !",
      buttons: ['OK'],
    });
    alert.present();
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: 'Votre réponse est : ' + this.listQuestions[this.numQuestion].correct_answer,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

}
