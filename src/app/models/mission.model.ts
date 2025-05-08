import { Personnel } from './personnel.model';
import { Competence } from './personnel.model';

export interface Mission {
    idMission: number;
    nom_mission: string;
    description: string;
    dateDebut: string;
    duree: number;
    statut_mission: 'En préparation' | 'planifiee' | 'en cours' | 'terminé';

    }

export interface AffecterPersMission {
    idMission: number;
    personnel: Personnel;
    dateAffectation: Date;
}

export interface NecessiterMissionComp {
    competence: Competence;
    idMission: number;
    nombre_personne: number;
}

