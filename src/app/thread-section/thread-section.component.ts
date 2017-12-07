import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../services/threads.service';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  constructor(private threadsService: ThreadsService) { }

  ngOnInit() {

      // Rest API Call to Backend to fetch data
      this.threadsService.loadUserThreads();

  }

}
