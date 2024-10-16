import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  usersCollection: AngularFirestoreCollection<any>;
  userList$: Observable<any[]> | undefined;

  constructor(private db: AngularFirestore) {
    this.usersCollection = db.collection('user');
  }

  ngOnInit(): void {
    // this.getUsersList();
    this.getUserUpdates();
  }

  getUserUpdates() {
    this.userList$ = this.usersCollection.valueChanges({ idField: "id" });
  }

  // getUsersList() {
  //   this.usersCollection.get().subscribe({
  //     next: (snapshot) => {
  //       this.userList = snapshot.docs.map(doc => {
  //         return { id: doc.id, ...doc.data() }; // Store document ID and data
  //       });
  //       console.log(this.userList); // Optional: Check the output in the console
  //     },
  //     error: (error) => {
  //       console.error('Error fetching user list:', error);
  //     }
  //   });
  // }

  adduser() {
    try {
      this.usersCollection.add({
        "name": "demo",
        "email": "demo@gmial.com",
        "number": "1234569870"
      });
    } catch (error) {
      console.log(error);

    }
  }
}
