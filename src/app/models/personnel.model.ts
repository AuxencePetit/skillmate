export interface Personnel {
    idUtilisateur: number;
    nom: string;
    prenom: string;
    email: string;
    statut_personnel: 'employe' | 'chef_projet' | 'admin';
    date_embauche: Date;
    date_naissance: Date;
    competences?: Competence[]; // Liste des compétences
  }
  
  export interface Competence {
    idComp: number;
    libelle: string;
    description: string;
    idCategorie: number;
  }

  export interface Categorie {
    idCategorie: string;
    description: string;
  }

  