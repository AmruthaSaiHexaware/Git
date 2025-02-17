import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomMessageServiceService } from '../custom-message-service.service';
import { Router } from '@angular/router';
import { IconModule } from '@backbase/ui-ang/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from '@backbase/ui-ang/textarea';
import { Notification } from '@backbase/ui-ang/notification';
@Component({
  selector: 'bb-add-new-message',
  templateUrl: './add-new-message.component.html',
  styleUrls: ['./add-new-message.component.scss'],

})
export class AddNewMessageComponent {
  public readonly messageForm: FormGroup;
  public showNotification: boolean = false;
  notification:string=''
  bb_icon:string=''


  constructor(
    private formBuilder: FormBuilder,
    private messageService:CustomMessageServiceService,
    private router:Router) {
    this.messageForm = this.formBuilder.group({
      newMessage: ['', Validators.required],
    });
  }

  submitMessage() {
    const newMessage = this.messageForm.value.newMessage;
    if (!newMessage) {
      console.error("Error: The 'message' field cannot be empty.");
      this.showNotification = true;
      this.notification = "The 'message' field cannot be empty.";
      this.bb_icon = 'cancel';
      setTimeout(() => {
        this.closeNotification();
        this.router.navigate(['/getAllTasks']);
      }, 3000);
  
      return;
    }
  
    const messageId = this.generateUniqueId();
    const tempMessage = { messageId, message: newMessage };
    this.messageService.addMessage(tempMessage);
  
    this.messageService.postMessage({ message: newMessage }, messageId).subscribe(
      response => {
        this.showNotification = true;
        console.log('Message posted successfully:', response);
        this.notification = "Your message was posted successfully!";
        this.bb_icon = 'check-circle-outline';
        setTimeout(() => {
          this.closeNotification();
        }, 3000);
      },
      error => {
        console.error('Error posting message:', error);
        this.showNotification = true;
        this.notification = "Error posting message.";
        this.bb_icon = 'cancel';
        setTimeout(() => {
          this.closeNotification();
        }, 3000);
      }
    );
  }
  
  private generateUniqueId(): string {
    const randomThreeDigits = Math.floor(100 + Math.random() * 900);
    return `m${randomThreeDigits}`;
  }

  closeNotification() {
    this.showNotification = false;
    this.router.navigate(['/getAllTasks']) 
  }

  
}