import { useState, useContext, useEffect } from "react";
import { drapeaux } from "../../utils/ImportDrapeaux";
import ZoneDentree from "./ZoneDentree";
import DrapeauxUtilisesContext from "../store/drapeaux-utilises-context";
import ResultatsContext from "../store/resultats-context";

export default function ZoneDeJeu() {
  const [drapeauActuel, setDrapeauActuel] = useState(drapeaux[Math.floor(Math.random() * drapeaux.length)]);
  const [drapeauxRestants, setDrapeauxRestants] = useState([...drapeaux]);

  const ctxDrapeauxUtilises = useContext(DrapeauxUtilisesContext);
  const ctxResultats = useContext(ResultatsContext);

  function nettoyerChaine(chaine) {
    const chaineNettoyee = chaine.replace(/[^a-zA-Z]/g, '');
    return chaineNettoyee;
  }

  function validationDrapeau(drapeauEntre) {
    console.log(nettoyerChaine(drapeauEntre));
    let retour = false;
    if(nettoyerChaine(drapeauEntre).toLowerCase()===nettoyerChaine(drapeauActuel.nom).toLowerCase()) {
      ctxDrapeauxUtilises.ajouterDrapeau(drapeauActuel);
      setDrapeauxRestants(drapeauxRestants.filter(pays => {
        return pays.nom !== drapeauActuel.nom;
      }));
      retour = true;
    } else {
      ctxResultats.enleverPourcents((1/(ctxDrapeauxUtilises.drapeauxUtilises.length+1))*100);
      console.log(ctxDrapeauxUtilises.drapeauxUtilises.length);
    }
    return retour;
  }

  function passer() {
    setDrapeauActuel(drapeauxRestants[Math.floor(Math.random() * drapeauxRestants.length)]);
  }

  useEffect(() => {
    if(drapeauxRestants.length!==0) {
      setDrapeauActuel(drapeauxRestants[Math.floor(Math.random() * drapeauxRestants.length)]);
    } else {
      ctxResultats.finir();
    }
  }, [drapeauxRestants, ctxResultats])

  return (
    <div className="flex gap-2">
      <img src={drapeauActuel.img} alt={drapeauActuel.nom} className="border"/>
      <ZoneDentree onEnvoi={validationDrapeau} onSkip={passer}/>
    </div>
  );
}