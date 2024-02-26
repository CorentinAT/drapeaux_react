import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Mot from "./Mot";
import { drapeauxMonde } from "../../utils/ImportDrapeaux";
import LanguageContext from "../store/language-context";
import MessageClick from "./MessageClick";

export default function ZoneSaisie(props) {
  const [listeDrapeaux, setListeDrapeaux] = useState([]);
  const [indexDrapeau, setIndexDrapeau] = useState(0);
  const [isFocus, setIsFocus] = useState(true);
  const inputRef = useRef();

  const lang = useContext(LanguageContext).lang;

  useEffect(() => {
    const nomsSansAccents = [];
    for (let i = 0; i < drapeauxMonde.length; i++) {
        const nomSansAccents = drapeauxMonde[i].noms[lang][0].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        nomsSansAccents.push(nomSansAccents);
    }
    for (let i = nomsSansAccents.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nomsSansAccents[i], nomsSansAccents[j]] = [nomsSansAccents[j], nomsSansAccents[i]];
    }
    setListeDrapeaux(nomsSansAccents);
  }, []);

  const onClickHandler = useCallback(() => {
    inputRef.current.focus();
  })

  const motSuivant = useCallback(() => {
    setIndexDrapeau(indexDrapeau+1);
  })

  const motPrecedent = useCallback(() => {
    if(indexDrapeau>0) {
      setIndexDrapeau(indexDrapeau-1);
    }
  })

  const onFocusHandler = useCallback(() => {
    setIsFocus(true);
  })

  const onBlurHandler = useCallback(() => {
    setIsFocus(false);
  })

  const listeMots = listeDrapeaux.map((drapeau, index) => <Mot inputRef={inputRef} onFocus={onFocusHandler} onBlur={onBlurHandler} mot={drapeau} key={drapeau} estBon={props.estBon} estFaux={props.estFaux} motSuivant={motSuivant} motPrecedent={motPrecedent} actuel={indexDrapeau===index}/>);

  return (
    <div className="w-10/12 md:w-8/12 border h-[300px] rounded p-2 border-gray-300 relative" onClick={onClickHandler}>
      {!isFocus && <MessageClick/>}
      <div className="h-full flex flex-wrap overflow-hidden whitespace-break-spaces gap-[10px]">
        {listeMots}
      </div>
    </div>
  );
}