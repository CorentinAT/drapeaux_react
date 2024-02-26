import { useEffect, useState, memo } from "react";

const Lettre = memo(function Lettre(props) {
  const [estBon, setEstBon] = useState(false);
  const [erreur, setErreur] = useState();

  useEffect(() => {
    if(props.motActuel) {
      if(props.index===props.indexCurseur-1 && !props.efface) {
        if(props.input===props.lettre) {
          setEstBon(true);
          props.estBon();
        } else {
          setErreur(true);
          props.estFaux();
        }
      }
      if(props.indexCurseur-1<props.index) {
        setEstBon(false);
        setErreur(null);
      }
    }
  }, [props.input, props.indexCurseur, props.motActuel]);

  let style = "text-xl transition-text duration-150";
  if(estBon) {
    style += " text-black";
  }
  if(erreur) {
    if(props.lettre===" ") {
      style += " bg-red-600"
    } else {
      style += " text-red-600";
    }
  }
  if(!erreur && !estBon) {
    style += " text-gray-300";
  }

  return (
    <div className="flex">
      {props.motActuel && props.index===props.indexCurseur &&
        <div className="w-px h-6 bg-black"></div>
      }
      <p className={`select-none ${style}`}>
        {props.lettre}
      </p>
    </div>
  );
})

export default Lettre;