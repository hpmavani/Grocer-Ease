import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue } from "firebase/database";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false
})

export class FavoritesPage implements OnInit {

  constructor() {}

  ngOnInit() {
    this.readDataOnce();

    this.listenForUpdates();
  }

  private readDataOnce() {
    const database = getDatabase();
    const recipesRef = ref(database, 'recipes/list');

    get(recipesRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log('Data fetched once:', data);
      } else {
        console.log('No data available');
      }
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  private listenForUpdates() {
    const database = getDatabase();
    const recipesRef = ref(database, 'recipes/list');

    onValue(recipesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log('Real-time data:', data);
      } else {
        console.log('No data available');
      }
    }, (error) => {
      console.error('Error listening to updates:', error);
    });
  }
}