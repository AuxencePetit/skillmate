export interface Mission {
    idMission: number;
    nom_mission: string;
    description: string;
    dateDebut: Date;
    duree: number;
    statut_mission: 'En préparation' | 'planifiee' | 'en cours' | 'terminé';
    }

export interface AffecterPersMission {
    idMission: number;
    idUtilisateur: number;
    dateAffectation: Date;
}

export interface NecessiterMissionComp {
    idMission: number;
    idComp: number;
    niveau_requis: number;
}

