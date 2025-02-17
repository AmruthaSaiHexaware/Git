import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@backbase/ui-ang/icon';
import { TextareaModule } from '@backbase/ui-ang/textarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomGetMessagesComponent } from './custom-get-messages/custom-get-messages.component';
import { CustomMessageByIdComponent } from './custom-message-by-id/custom-message-by-id.component';
import { AddNewMessageComponent } from './add-new-message/add-new-message.component';
import { ButtonModule } from '@backbase/ui-ang/button';
import { Routes } from '@angular/router';

const routes: Routes = [
    {
      path: 'getAllTasks',
      component: CustomGetMessagesComponent     },
    {
      path: 'getTaskbyId/:id',
      component: CustomMessageByIdComponent     },
    {
      path: 'addNewMessage',
      component: AddNewMessageComponent     }
  ];
@NgModule({
    declarations: [
        CustomGetMessagesComponent,
        CustomMessageByIdComponent,
        AddNewMessageComponent],
    imports: [
        CommonModule,
        IconModule,
        TextareaModule,
        ReactiveFormsModule,
        ButtonModule,
        FormsModule
    ]
})
export class MessagesBundleModule { }