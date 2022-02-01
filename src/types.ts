


// export enum ContainerType {
//     Affix = "Affix",
//     Modal = "Modal",
    
//   }
export interface Config  {
    Configuration: {
        position: string,
        icons?: Array<any>
    }
}

export interface Item {
    id?: number;
    name: string;
    link: string;
    icon?: any;
  }