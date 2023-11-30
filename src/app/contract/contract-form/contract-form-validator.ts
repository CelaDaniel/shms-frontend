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

export const maxFileSize: ValidatorFn = (
    formGroup: AbstractControl
): ValidationErrors | null => {
    const file = formGroup.get('file')?.value! as File;
    const maxSize = 10 * 1024 * 1014; //10 mb

    if (file?.size > maxSize) {
        return {
            maxFileSize: 'Max file size is',
        };
    }

    return null;
};

export const discountMaxValue: ValidatorFn = (
    formGroup: AbstractControl
): ValidationErrors | null => {
    const apartmentFee = Number(formGroup.get('apartmentFee')!.value!);
    const apartmentDiscount = Number(
        formGroup.get('apartmentDiscount')!.value!
    );
    const apartmentPercentage = formGroup.get('apartmentPercentage')!.value!;

    const parkingSpotFee = Number(formGroup.get('parkingSpotFee')!.value!);
    const parkingSpotDiscount = Number(
        formGroup.get('parkingSpotDiscount')!.value!
    );
    const parkingSpotPercentage = formGroup.get('parkingSpotPercentage')!
        .value!;

    if (
        (apartmentPercentage && apartmentDiscount >= 100) ||
        (!apartmentPercentage &&
            apartmentDiscount >= apartmentFee &&
            apartmentFee > 0) ||
        (parkingSpotPercentage && parkingSpotDiscount >= 100) ||
        (!parkingSpotPercentage &&
            parkingSpotDiscount >= parkingSpotFee &&
            parkingSpotFee > 0)
    ) {
        return {
            discountMaxValue: 'You have exceeded apartment discount max value',
        };
    }

    return null;
};
