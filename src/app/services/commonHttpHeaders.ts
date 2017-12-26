import { HttpHeaders } from "@angular/common/http";

export function commonHttpHeaders(userId:number) {
    const headers =  new HttpHeaders(
      {
        'UserID': userId.toString(),
        'Content-Type': 'application/json; charset=utf-8'
      }
    );

    return {headers}
  }