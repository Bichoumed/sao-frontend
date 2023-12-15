import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial';// Updated import
import { TutorialService } from 'src/app/services/tutorial.service'; // Updated import

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };

  submitted = false;

  constructor(private tutorialService: TutorialService) { } // Updated constructor

  ngOnInit(): void {
  }

  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description,
      published: this.tutorial.published
    };

    this.tutorialService.create(data).subscribe({
      next: (response) => {
        console.log(response);
        this.submitted = true;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completed');
      }
    });
  }

  newTutorial(): void { // Updated method
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false
    };
  }

}
