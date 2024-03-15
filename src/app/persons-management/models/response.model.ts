export interface JsonResponse<T> {
  httpCode : number;
  ok : boolean;
  data: T,
  errors: string[];
}
