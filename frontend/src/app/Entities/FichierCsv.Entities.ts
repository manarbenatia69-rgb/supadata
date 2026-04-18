import { REntreprise } from "./REntreprise.Entities";

export class FichierCsv {
    constructor(
           public id?:             number,
           public fichier?:        string,
           public filename?:       string,
           public filepath?:       string,
           public uploadDate?:      Date,
           public entreprise?: REntreprise
           
    ) {}    
}