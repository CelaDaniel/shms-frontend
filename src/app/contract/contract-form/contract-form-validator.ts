import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const apartmentOrParkingSpotRequired: ValidatorFn = (
    formGroup: AbstractControl
): ValidationErrors | null => {
    const apartment = formGroup.get('apartment')?.value;
    const parkingSpot = formGroup.get('parkingSpot')?.value;

    if (!(apartment instanceof Object) && !(parkingSpot instanceof Object)) {
        return {
            apartmentOrParkingSpotRequired:
                'Select either Apartment or Parking Spot',
        };
    }

    return null;
};
