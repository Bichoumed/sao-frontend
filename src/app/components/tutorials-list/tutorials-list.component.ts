import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial'; // Update to Tutorial model
import { TutorialService } from 'src/app/services/tutorial.service'; // Update to Tutorial service

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {
  tutorials?: Tutorial[];
  currentTutorial?: Tutorial;
  currentIndex = -1;
  title: "" | undefined; // Update to use title

  constructor(private tutorialService: TutorialService) { } // Use TutorialService

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll().subscribe(data => {
      console.log(data);
      this.tutorials = data;
    },
      error => {
        console.log(error);
      });
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = undefined;
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void { // Update method name and parameter
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  searchTitle(): void { // Update to search by title
    this.tutorialService.findByTitle(this.title).subscribe(data => {
      this.tutorials = data;
      console.log(data);
    },
      error => {
        console.error(error);
      });
  }

  removeAllTutorials(): void { // Update method name
    this.tutorialService.deleteAll().subscribe(response => {
      console.log(response);
      this.refreshList();
    },
      error => {
        console.error(error);
      })
  }

}
