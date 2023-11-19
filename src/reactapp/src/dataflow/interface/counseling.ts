export type ICounselingStudent = {
  id: number,
  counseling_application: ICounselingApplication,
  student: number,
  counselor: number,
};

interface ICounselingApplication {
  id: number;
  student: number;
  application_file: string | null;
  applied_at: string;
  counseling_type: string;
}

interface IApplicationForm {
  id: number;
  student: number;
  application_file: string | null;
  applied_at: string;
  approved: boolean;
  denied: boolean;
  counseling_preferfields: Array<string>;
  counseling_prefertimeslots: Array<string>;
  counseling_type: string;
  test_date: string;
  test_timeslot: string;
}

export type { ICounselingStudent, ICounselingApplication, IApplicationForm };

export type ICounselingSchedule = {
  id: number,
  counseling: number,
  session_number: number,
  session_date: string,
  session_timeslot: string,
  session_status: string,
};