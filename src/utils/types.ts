import { match } from "react-router";
import { History } from "history";

export interface IBaseProps{
    match: match;
    history:History;
    location:any
  }