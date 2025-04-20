// lib/apiError.ts
export class CustomError extends Error {
  status: number;
  constructor( message: string,statusCode?: number) {
    super(message);
    this.status = statusCode ?? 400;
  }
}


export const handleError = (message="Error occourd",status=400) => {
  return {
    message: message,
    status: status,
    hint:`Please check your all information and try again or contact out team support@glowniba.com`
  };
};
