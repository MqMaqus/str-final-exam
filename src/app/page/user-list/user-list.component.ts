import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]> = this.userService.userList$;
 
  userToDelete: User = new User;

  // filter
  txt: string = '';
  phraseKey: string = '';
  keyArray: string[] = Object.keys(new User());

  // sorter
  columnKey: string = '';
  direction: string = '';


  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getAll();
    this.users$.subscribe();
  }

  // sorter
  onColumnSelect(key: string): void {
    this.switchDirectionValue();
    this.columnKey = key;
  }

  switchDirectionValue(): any {
    if (this.direction === '' || this.direction === 'dsc') {
      return this.direction = 'asc';
    }
    return this.direction = 'dsc';
  }

  onDelete(user: User): void {
    this.userToDelete = user;
    this.userService.remove(user).subscribe(
      () => {
        this.userService.getAll();
      }
    );
  }
}
