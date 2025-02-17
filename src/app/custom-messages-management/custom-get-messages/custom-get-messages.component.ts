import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomMessageServiceService } from '../custom-message-service.service';

@Component({
  selector: 'bb-custom-get-messages',
  templateUrl: './custom-get-messages.component.html',
  styleUrls: ['./custom-get-messages.component.scss'],
})
export class CustomGetMessagesComponent implements OnInit {
  messages: any[] = [];
  notification: string = '';
  bb_icon: string = '';
  showNotification: boolean = false;
  showSearch = '';
  showClear = '';
  messageId: any;
  searchText = '';
 

  constructor(
    private messageService: CustomMessageServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.messageService.messages$.subscribe(messages => {
      this.messages = messages;
    });
  
    this.getNewMessages();
  }
  
  getNewMessages() {
    this.messageService.getNewMessage().subscribe(
      (data: any[]) => { 
        const currentMessages = this.messageService.getCurrentMessages();
        const uniqueMessages = [...currentMessages, ...data.filter(
          (newMessage: any) => !currentMessages.some(
            (existingMessage: any) => existingMessage.messageId === newMessage.messageId
          )
        )];
        this.messageService.setMessages(uniqueMessages);
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }
  
  

  addNewMessage() {
    console.log("Navigated!!");
   
    this.router.navigate(['/addNewMessage']);
   
  }

  editMessage(index: number) {
    this.messages[index].isEditing = true;
  }

  updateMessage(message: any) {
    this.messageService.updateMessage(message).subscribe(
      (response) => {
        message.isEditing = false;
        console.log('Message updated successfully:', response);
        this.showNotification = true;
        this.notification = 'Message updated successfully';
        this.bb_icon = "check-circle-outline";
        setTimeout(() => {
          this.closeNotification();
        }, 3000);
      },
      (error) => {
        console.error('Error updating message:', error);
      }
    );
  }

  deleteMessage(messageId: any) {
    this.messageService.deleteMessage(messageId).subscribe(
      (response) => {
        this.messages = this.messages.filter(message => message.messageId !== messageId);
        this.showNotification = true;
        this.notification = 'Message deleted successfully!';
        this.bb_icon = "check-circle-outline";
        setTimeout(() => {
          this.closeNotification();
        }, 3000);
      },
      (error) => {
        console.log('Error while deleting the message', error);
      }
    );
  }
  closeNotification() {
    this.showNotification = false;
    this.router.navigate(['/getAllTasks']);
  }
  submit(text: string) {
    this.messageId = text;
    console.log('Submitted text:', text);
    const messageExists = this.messages.some(message => message.messageId === text);
  
    if (messageExists) {
      this.router.navigate(['/getTaskbyId', text]);
    } else {
      this.showNotification = true;
      this.notification = 'No message found with the given Id!';
      this.bb_icon = "alert-circle-outline";
      setTimeout(() => {
        this.closeNotification();
      }, 3000);
    }
  }
  
  

 
}
