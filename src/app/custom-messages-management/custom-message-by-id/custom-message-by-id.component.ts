import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomMessageServiceService } from '../custom-message-service.service';

@Component({
  selector: 'bb-custom-message-by-id',
  templateUrl: './custom-message-by-id.component.html',
  styleUrls: ['./custom-message-by-id.component.scss'],
})
export class CustomMessageByIdComponent implements OnInit {
  message: any;
  messageId: any;

  constructor(
    private messageService: CustomMessageServiceService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.messageId = id;
    console.log(id);
    this.getRequiredMessage(this.messageId);
  }

  getRequiredMessage(messageId: any) {
    this.messageService.getMessageById(messageId).subscribe((data) => {
      this.message = data;
    });
  }

  getAllMessages(){
    this.router.navigate(['/getAllTasks'])
  }
}
