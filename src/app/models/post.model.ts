import { Guid } from "guid-typescript";
import { Timestamp } from 'rxjs';
export class post {
 
    // Identifiant Guid
    id: Guid;

    // Identifiant Guid
    identifiant: string;

    // titre
    title: string;

    // Contenu
    content: string;

    // Nombre de like
    loveIts: number;

    // date de création
    created_at: number;

    // Constructeur par défaut
    constructor(title:string,
                content:string,
                loveits:number)
    {
        this.id = Guid.create();
        this.identifiant = this.id.toString();
        this.title = title;
        this.content = content;
        this.loveIts = loveits;
        this.created_at = Date.now();
    }
}