export type CareerFieldName =
  | "applicationDeadline"
  | "descriptionText"
  | "employmentType"
  | "experienceLevel"
  | "locationText"
  | "salaryCurrency"
  | "salaryMax"
  | "salaryMin"
  | "salaryPeriod"
  | "slug"
  | "summary"
  | "title"
  | "workMode";

export type CareerEditorActionState = {
  fieldErrors: Partial<Record<CareerFieldName, string>>;
  formError: string | null;
};

export const initialCareerEditorActionState: CareerEditorActionState = {
  fieldErrors: {},
  formError: null,
};
