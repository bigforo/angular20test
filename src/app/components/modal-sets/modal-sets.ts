import {Component, effect, inject, input, linkedSignal, model, OnInit, output} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonInput,
  IonModal, IonTextarea, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, NavController
} from "@ionic/angular/standalone";
import {DatePipe} from '@angular/common';
import {ExHistory} from '../ex-history/ex-history';
import {ShowSets} from '../../pages/page-show-exercise/show-sets/show-sets';
import {Activity} from '../../classes/state.interface';
import {SetClass} from '../../classes/set.class';
import {CommonService} from '../../classes/common.service';
import {OverlayEventDetail} from '@ionic/core';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-modal-sets',
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonLabel,
    IonModal,
    IonTitle,
    IonToolbar,
    DatePipe,
    ExHistory,
    ShowSets,
    IonTextarea,
    FormsModule,
    IonInput,
    IonGrid,
    IonCol,
    IonRow,
    RouterLink
  ],
  templateUrl: './modal-sets.html',
  styleUrl: './modal-sets.scss'
})
export class ModalSets implements OnInit{
  service = inject(CommonService)
  activity =  input.required<Activity>();
  open = input.required<boolean>();
  router = inject(Router);
  closed = output<boolean>();
  values = {
    reps: "",
    kgs: "",
    free: "",
  }
  constructor() {
    effect(() => {
      //Default value when OPEN
       this.values = {
         reps: this.lastSet()?.reps ?? "",
         kgs: this.lastSet()?.size ?? "",
         free: this.note(),
       }
    });
  }
  note = linkedSignal(()=>{
    return this.activity().note;
  });
  lastSet =  linkedSignal(()=>{
    return this.activity().sets.at(-1);
  })
  ngOnInit(): void {
    this.service.getAllHistoryByActivityId(this.activity().id);
  }
  addSet(p0: Activity, values: {
    reps: string
    kgs: string
    free: string
  }) {
    this.service.startSessionIfNotStarted();
    let ex = Activity.exerciseById(p0.id);
      if (ex?.weightUnit && ex?.reps)
        this.activity().sets.push(new SetClass(values.reps, values.kgs));
      else if  (!ex?.weightUnit && ex?.reps)
        this.activity().sets.push(new SetClass(values.reps, ""));
      else
        this.activity().sets.push(new SetClass(values.free, ""));

      this.service.save();
  }

  async canDismiss(data?: undefined, role?: string) {
    return role !== 'gesture' ;//&& role !== 'backdrop';
  }
  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    this.closed.emit(true);
    this.service.save();
  }

  getNote():string {
    return this.note()
  }

  setNote(value:string) {
    this.activity().note = value;
    this.service.save();
  }

  protected readonly Activity = Activity;

  navyController = inject(NavController);
  redirect(modal: IonModal) {
    modal.isOpen = false;
    void this.navyController.navigateForward("exercise/" +this.activity().id)
  }

  protected readonly model = model;

  clickToNavigate(id: number, modal:IonModal) {
    if (id > -1) {
      modal.isOpen = false;
      void this.router.navigate(["session/"], {queryParams: {id: id}});
    }
  }
}
