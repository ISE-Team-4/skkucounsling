import { makeAutoObservable } from "mobx";
import { remote } from "../../remote/RemoteSource";
import { IApplicationForm } from "../../interface/counseling";

class StudentStore {
  constructor() {
    makeAutoObservable(this);
  }

  application!: IApplicationForm;
  applicationExist: boolean = false;

  fetchApplication = () => {
    remote
      .get("counseling/application-student/")
      .onSuccess((json: any) => {
        console.log("fetch success");
        this.application=json.couseling_application[0];
        for (const a of json.couseling_application){
          if(this.application.applied_at<a.applied_at){
            this.application=a;
          }
        }
        console.log(this.application);
        this.applicationExist = true;
      })
      .onFailed((code: number, msg?: string) => {
        console.log("fetch failed");
        this.applicationExist = false;
      })
      .send();
  };
}

export const studentStore = new StudentStore();
