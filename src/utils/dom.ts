export const setVisible = (value: boolean) => {
  const container = document.querySelector('.az-social') as HTMLElement;
  // debugger;
  if (value) {
    // container.style.display="block !important"
    // container?.removeAttribute('tabindex');
    // return container?.classList.add('visible');
    return container.style.display="block"
  }
  // container.style.display="none !important"
  // container?.setAttribute('tabindex', '-1');
  // container?.classList.add('invisible');
  container.style.display="none"
  container?.classList.remove('visible');
}


// export const setVisible = (value: boolean) => {
//     // const container = document.querySelector('.social-fortuna-wrapper') as HTMLElement;
//     // 
//     const container = document.getElementById('social-fortuna-wrapper') as HTMLElement;
    
//     if (value) {
//       container.style.display="block !important"
//       container?.removeAttribute('tabindex');
//       return container?.classList.add('visible');
//     }
//     container.style.display="none !important"
//     container?.setAttribute('tabindex', '-1');
//     container?.classList.remove('visible');

//   };

//   export const setVisibleV2 = (cssClassName:string,value: boolean) => {
//     // debugger;
//     // const container = document.querySelector('.'+cssClassName) as HTMLElement;
    
//     // if (value) {
//     //   container.style.display="block !important"
//     //   container?.removeAttribute('tabindex');
//     //   container?.style.setProperty('left',"0")
//     //   return container?.classList.add('visible');
//     // }
//     // container.style.display="none !important"
//     // container?.setAttribute('tabindex', '-1');
//     // container?.classList.remove('visible');
//     // container?.style.setProperty('left',"-250px")
    
//   };