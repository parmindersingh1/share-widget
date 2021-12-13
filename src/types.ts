


// export enum ContainerType {
//     Affix = "Affix",
//     Modal = "Modal",
    
//   }
export interface Config  {
    type: string,
    display?:boolean,
    backgrounColor?:string,
    logoURl?: string,
    body?: string,
    socialMedia?:{
        twitter?:{
            buttonText?:string,
            buttonColor?:string
        }
        facebook?:{
            buttonText?:string,
            buttonColor?:string
        },
        linkedin?:{
            buttonText?:string,
            buttonColor?:string
        }
        instagram?:{
            buttonText?:string,
            buttonColor?:string
        }
    }
}