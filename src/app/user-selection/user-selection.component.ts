import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../store/application-state';
import { SelectUserAction, LoadUserThreadsAction } from '../store/actions';

@Component({
  selector: 'user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent {

  constructor(private store: Store<ApplicationState>) { }


  onSelectUser(newUserId:number){
    this.store.dispatch(new SelectUserAction(newUserId));
  }

}
