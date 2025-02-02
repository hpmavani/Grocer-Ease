import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: false
})
export class CameraPage implements OnInit {

  constructor(public photoService: PhotoService, private router: Router) { }

  ngOnInit() {
  }

  async addPhotoToGallery() {
      try {
        const response = await this.photoService.addNewToGallery(); // Wait for the response
        if (response) {
          this.router.navigate(['/tabs/recipes'], { state: { response } });
        } else {
          console.log("No response from photo service");
        }
      } catch (error) {
        console.error("Error adding photo to gallery", error);
      }
    }

}
