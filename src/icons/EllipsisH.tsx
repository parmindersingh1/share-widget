import { h, FunctionalComponent } from "preact";

 interface Props {
    width?:string,
    height?:string,
    fill?:string
 }
const EllipsisHIcon: FunctionalComponent<Props> =(props)=> {


    return (
      
        <svg role="img" 
        height= {props.height}
        width= {props.width}
        viewBox="0 0 122.88 29.956" xmlns="http://www.w3.org/2000/svg">
        <path fill={props.fill} d="M122.88,14.978c0,8.271-6.708,14.979-14.979,14.979s-14.976-6.708-14.976-14.979 C92.926,6.708,99.631,0,107.901,0S122.88,6.708,122.88,14.978L122.88,14.978z M29.954,14.978c0,8.271-6.708,14.979-14.979,14.979 S0,23.248,0,14.978C0,6.708,6.705,0,14.976,0S29.954,6.708,29.954,14.978L29.954,14.978z M76.417,14.978 c0,8.271-6.708,14.979-14.979,14.979c-8.27,0-14.978-6.708-14.978-14.979C46.46,6.708,53.168,0,61.438,0 C69.709,0,76.417,6.708,76.417,14.978L76.417,14.978z"/>
       </svg>
    );
}


EllipsisHIcon.defaultProps= {
    fill:'white'
}

export default EllipsisHIcon;


