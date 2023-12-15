import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service'; // Update to Tutorial service
import { Tutorial } from 'src/app/models/tutorial'; // Update to Tutorial model
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
  currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(
    private tutorialService: TutorialService, // Update to TutorialService
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getTutorial(this.route.snapshot.params['id']);
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id).subscribe(data => {
      this.currentTutorial = data;
      console.log(data);
    },
    error => {
      console.error(error);
    });
  }

  updatePublished(status: boolean): void { // Update method name and properties
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };
    this.tutorialService.update(this.currentTutorial.id, data).subscribe(response => {
      this.currentTutorial.published = status; // Update property name
      console.log(response);
      this.message = 'The status was updated successfully!'; // Update message
    },
    error => {
      console.error(error);
    });
  }

  updateTutorial(): void { // Update method name
    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial).subscribe(response => {
      console.log(response);
      this.message = 'The tutorial was updated successfully!'; // Update message
    },
    error => {
      console.error(error);
    });
  }

  deleteTutorial(): void { // Update method name
    this.tutorialService.delete(this.currentTutorial.id).subscribe(response => {
      console.log(response);
      this.router.navigate(['/tutorials']); // Update navigation path
    },
    error => {
      console.error(error);
    });
  }
}
