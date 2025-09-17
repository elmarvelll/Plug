

interface page1 {
    fullName: string;
    Number: string;
    MatNo: string;
    Level: string;
    Email: string;
}
interface page2 {
    BusinessName: string,
    Category: string,
    BuisnessDescription: string,
}
interface page3 {
    OperatingDays: string,
    Delivery: string

}
export interface fullPage {
    firstPage: page1
    secondPage: page2;
    thirdPage: page3;
}
export interface donestate {
    firstPage: boolean|null,
    secondPage: boolean|null,
    thirdPage: boolean|null
}
export type Page = 'firstPage' | 'secondPage' | 'thirdPage';
export type formstate = {
    firstPage: {
        fullName: boolean,
        Number: boolean,
        MatNo: boolean,
        Level: boolean,
        Email: boolean
    },
    secondPage: {
        BusinessName: boolean,
        Category: boolean,
        BuisnessDescription: boolean,
    },
    thirdPage: {
        OperatingDays: boolean,
        Delivery: boolean
    }
}