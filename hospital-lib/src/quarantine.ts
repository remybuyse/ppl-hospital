import { PatientsRegister } from './patientsRegister';

export const allStates = {
    F: 'Fever',
    H: 'Healthy',
    D: 'Diabetes',
    T: 'Tuberculosis',
    X: 'Dead',
};

export const allDrugs = {
    As: 'Aspirin',
    An: 'Antibiotic',
    I : 'Insulin',
    P : 'Paracetamol',
};

export type State = keyof typeof allStates;
export type Drug  = keyof typeof allDrugs;

export class Quarantine {

    private patients: PatientsRegister;
    private drugsToGive: Drug[] = [];

    constructor(patients: PatientsRegister) {
        this.patients = { ...patients };
    }

    public setDrugs(drugs: Drug[]): void {
        this.drugsToGive = drugs;
    }

    public wait40Days(): void {
        this.administrateDrugsToPatients();
    }

    public report(): PatientsRegister {
        return this.patients;
    }

    // Update patients' states according to the drugs given
    private administrateDrugsToPatients(): void {
        let newPatientsStates:PatientsRegister = this.patients as PatientsRegister; // Copy patients
        for (var state in this.patients) { // For each patient's state
            if (this.patients.hasOwnProperty(state)) {
                let patientState    = state as State;
                let newStatePatient = patientState; // A sick patient not receiving the right medicines remains sick

                // Paracetamol kills subject if mixed with aspirin
                if(this.hasDrug('P') && this.hasDrug('As')) {
                    newStatePatient = 'X'; // Dead
                } else {
                    switch (state) {
                        case 'F': // Fever
                            if(this.hasDrug('P') || this.hasDrug('As')) {
                                newStatePatient = 'H'; // Healthy
                            }
                            break;
                        case 'H': // Healthy
                            if(this.hasDrug('I') && this.hasDrug('An')) { // If insulin is mixed with antibiotic, healthy people catch Fever
                                newStatePatient = 'F'; // Fever
                            }
                            break;
                        case 'D': // Diabetes
                            if(!this.hasDrug('I')) { // Diabetics die without insulin
                                newStatePatient = 'X'; // Dead
                            }
                            break;
                        case 'T': // Tuberculosis
                            if(this.hasDrug('An')) {
                                newStatePatient = 'H'; // Healthy
                            }
                            break;
                        case 'X': // Dead
                            break;
                    }
                }

                // If new patient's state is different from old patient's state
                if(newStatePatient != state) {
                    if(newPatientsStates[newStatePatient]) {
                        newPatientsStates[newStatePatient] += newPatientsStates[patientState]; // Increment count of new patient's state
                    } else {
                        newPatientsStates[newStatePatient] = newPatientsStates[patientState]; // Create new patient's state
                    }
                    newPatientsStates[patientState] -= newPatientsStates[patientState]; // Decrement count of old patient's state
                }
            }
        }

        this.patients = newPatientsStates; // Update patients
    }

    // Check if a drug is in the list of drugs to give
    private hasDrug(searchDrug: Drug): boolean {
        return this.drugsToGive.includes(searchDrug);
    }
}
