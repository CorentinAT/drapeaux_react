import { useState, memo } from "react";
import Lettre from "./Lettre";

const Mot =  memo(function Mot(props) {
  const [indexCurseur, setIndexCurseur] = useState(0);
  const [efface, setEfface] = useState(false);
  const [currentInput, setCurrentInput] = useState();

  function onInputHandler(e) {
    if(e.target.value===" "&&props.mot[indexCurseur]!==" ") {
      props.motSuivant();
    } else {
      setEfface(false);
      setIndexCurseur(indexCurseur+1);
      setCurrentInput(e.target.value);
      props.inputRef.current.value = "";
    }
  }

  function onKeyDownHandler(e) {
    if (e.key==="Backspace") {
      if(indexCurseur>0) {
        setIndexCurseur(indexCurseur-1);
        setEfface(true);
      } else {
        props.motPrecedent(0);
      }
    }
  }

  const listeLettres = props.mot.split('').map((lettre, i) => (
    <Lettre
      lettre={lettre}
      index={i}
      key={i}
      efface={efface}
      input={currentInput}
      indexCurseur={indexCurseur}
      estBon={props.estBon}
      estFaux={props.estFaux}
    />
  ));

  return(
    <>
      <input type="text" autoFocus={true} onBlur={props.onBlur} onFocus={props.onFocus} className="fixed opacity-0" ref={props.inputRef} onChange={onInputHandler} onKeyDown={onKeyDownHandler}/>
      <div className="flex gap-[1.5px]">
        {listeLettres}
      </div>
    </>
  );
})

export default Mot;