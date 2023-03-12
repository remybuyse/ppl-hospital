!function(t,s){"object"==typeof exports&&"object"==typeof module?module.exports=s():"function"==typeof define&&define.amd?define("hospitalLib",[],s):"object"==typeof exports?exports.hospitalLib=s():t.hospitalLib=s()}(self,(()=>(()=>{"use strict";var t={287:(t,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.allStates={F:"Fever",H:"Healthy",D:"Diabetes",T:"Tuberculosis",X:"Dead"},s.allDrugs={As:"Aspirin",An:"Antibiotic",I:"Insulin",P:"Paracetamol"},s.Quarantine=class{constructor(t){this.drugsToGive=[],this.patients=Object.assign({},t)}setDrugs(t){this.drugsToGive=t}wait40Days(){this.administrateDrugsToPatients()}report(){return this.patients}administrateDrugsToPatients(){let t=this.patients;for(var s in this.patients)if(this.patients.hasOwnProperty(s)){let e=s,i=e;if(this.hasDrug("P")&&this.hasDrug("As"))i="X";else switch(s){case"F":(this.hasDrug("P")||this.hasDrug("As"))&&(i="H");break;case"H":this.hasDrug("I")&&this.hasDrug("An")&&(i="F");break;case"D":this.hasDrug("I")||(i="X");break;case"T":this.hasDrug("An")&&(i="H")}i!=s&&(t[i]?t[i]+=t[e]:t[i]=t[e],t[e]-=t[e])}this.patients=t}hasDrug(t){return this.drugsToGive.includes(t)}}}},s={};function e(i){var a=s[i];if(void 0!==a)return a.exports;var r=s[i]={exports:{}};return t[i](r,r.exports,e),r.exports}var i={};return(()=>{var t=i;Object.defineProperty(t,"__esModule",{value:!0});var s=e(287);t.Quarantine=s.Quarantine,t.allStates=s.allStates,t.allDrugs=s.allDrugs})(),i})()));