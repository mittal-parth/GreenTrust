import React from "react";
import { useEffect } from "react";


const GoogleTranslate = () => {
  useEffect(() => {
    var elem = document.getElementById('google_translate_element');
    console.log('elem', elem)
    console.log(elem.querySelector('span'));
    // style.display = 'none'
    var poweredByDiv = document.getElementsByClassName('skiptranslate goog-te-gadget')
    poweredByDiv.innerText = '';
    console.log('happening')
  }, [])


  return;
};

export default GoogleTranslate;
