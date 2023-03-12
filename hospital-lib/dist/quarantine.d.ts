import { PatientsRegister } from './patientsRegister';
export declare const allStates: {
    F: string;
    H: string;
    D: string;
    T: string;
    X: string;
};
export declare const allDrugs: {
    As: string;
    An: string;
    I: string;
    P: string;
};
export declare type State = keyof typeof allStates;
export declare type Drug = keyof typeof allDrugs;
export declare class Quarantine {
    private patients;
    private drugsToGive;
    constructor(patients: PatientsRegister);
    setDrugs(drugs: Drug[]): void;
    wait40Days(): void;
    report(): PatientsRegister;
    private administrateDrugsToPatients;
    private hasDrug;
}
