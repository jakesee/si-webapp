export interface IInvoice {
    id: number,
    isTaxIncluded: boolean,
    taxRate: number,
    taxLabel: string
}

export interface IInvoiceLineItem {
    id: number,
    invoiceId: number,
    description: string,
    amount: number,
    quantity: number,
    feeSystemType: FeeSystemType,
    feeType: FeeType,
    scheme: BenefitScheme,
    rate?: number | null,
    copay?: number | null,
    code?: string | null,
    max?: number | null
}


export enum IInvoiceStatus {
    New, // no payment method
    Pending, // has payment method, waiting to be executeced
    Void, // invoice is cancelled
    Paid, // invoice payment is successful
    FailedPayment // payment is not successful; Failed Payment may have another payment method applied and status becomes pending.
}

export enum FeeType {
    Payment = "Payment",
    Consult = "Consultation",
    Prescription = "Prescription",
    Delivery = "Delivery",
    Applicable = "Applicable Fees",
    DrugsInjections = "Drugs and Injections",
    MedicalProcedure = "Medical Procedure",
    Consumables = "Consumables",
    Others = "Others",
}

export enum FeeSystemType {
    Default = 0,
    Voucher = 1,
    Benefit = 2
}

export enum BenefitScheme {
    // default line items
    NOT_APPLICABLE = 0,
    APPLICABLE = 1,

    // benefit line items
    LIMIT = 2,
    POOL = 3,
    DEDUCTIBLE_RATE = 4,
    DEDUCTIBLE_AMOUNT = 5,
    COPAY_RATE = 6,
    COPAY_AMOUNT = 7
}

class InvoiceLineItem implements IInvoiceLineItem {

    constructor(
        public id: number,
        public invoiceId: number,
        public description: string,
        public amount: number,
        public quantity: number,
        public feeSystemType: FeeSystemType,
        public feeType: FeeType,
        public scheme: BenefitScheme,
        public code?: string | null,
        public max?: number | null,
        public rate?: number | null,
        public copay?: number | null) { }
}

const BillTestData = () => {

    // Goods And Services
    const consultALineItem = new InvoiceLineItem(1, 1, "Standard Virutal Consult", 25, 1, FeeSystemType.Default, FeeType.Consult, BenefitScheme.APPLICABLE);
    const consultBLineItem = new InvoiceLineItem(1, 1, "Consult time extension (15m)", 15, 1, FeeSystemType.Default, FeeType.Consult, BenefitScheme.APPLICABLE);
    const deliveryLineItem = new InvoiceLineItem(1, 1, "delivery A", 8, 1, FeeSystemType.Default, FeeType.Delivery, BenefitScheme.NOT_APPLICABLE);
    const drugALineItem = new InvoiceLineItem(1, 1, "Drug A", 0.3200, 20, FeeSystemType.Default, FeeType.Prescription, BenefitScheme.APPLICABLE);
    const drugBLineItem = new InvoiceLineItem(1, 1, "Drug B", 0.0150, 60, FeeSystemType.Default, FeeType.Prescription, BenefitScheme.APPLICABLE);
    const drugCLineItem = new InvoiceLineItem(1, 1, "Drug C", 0.4200, 30, FeeSystemType.Default, FeeType.Prescription, BenefitScheme.APPLICABLE);
    const drugDLineItem = new InvoiceLineItem(1, 1, "Drug D", 0.1100, 20, FeeSystemType.Default, FeeType.Prescription, BenefitScheme.NOT_APPLICABLE);
    const cosmeticLineItem = new InvoiceLineItem(1, 1, "Fat extraction", 2550.21, 1, FeeSystemType.Default, FeeType.MedicalProcedure, BenefitScheme.NOT_APPLICABLE);
    const minorCutTreatment = new InvoiceLineItem(1, 1, "Wound treatment", 125.34, 1, FeeSystemType.Default, FeeType.MedicalProcedure, BenefitScheme.APPLICABLE);
    const bandagesLineItem = new InvoiceLineItem(1, 1, "Bandages", 32.33, 1, FeeSystemType.Default, FeeType.Consumables, BenefitScheme.APPLICABLE);
    const approvedInjectionLineItem = new InvoiceLineItem(1, 1, "COVID Injection", 65.70, 1, FeeSystemType.Default, FeeType.DrugsInjections, BenefitScheme.APPLICABLE);

    // Discounts
    const consultDiscountAmount = new InvoiceLineItem(1, 1, "Discount Amount A", -25, 1, FeeSystemType.Voucher, FeeType.Consult, BenefitScheme.APPLICABLE, "PROMOCODE-A");
    const consultDiscountRate50 = new InvoiceLineItem(1, 1, "Discount Rate A", 0, 1, FeeSystemType.Voucher, FeeType.Consult, BenefitScheme.APPLICABLE, "PROMOCODE-B", 0.5);
    const consultDiscountRate100 = new InvoiceLineItem(1, 1, "Discount Rate B", 0, 1, FeeSystemType.Voucher, FeeType.Consult, BenefitScheme.APPLICABLE, "PROMOCODE-B", 1.0);
    const prescriptionDiscountAmount = new InvoiceLineItem(1, 1, "Discount Amount A", -5, 1, FeeSystemType.Voucher, FeeType.Prescription, BenefitScheme.APPLICABLE, "PROMOCODE-A");
    const prescriptionDiscountRate = new InvoiceLineItem(1, 1, "Discount Rate A", 0, 1, FeeSystemType.Voucher, FeeType.Prescription, BenefitScheme.APPLICABLE, "PROMOCODE-B", 0.5);
    const deliveryDiscountAmount = new InvoiceLineItem(1, 1, "Discount Amount A", -8, 1, FeeSystemType.Voucher, FeeType.Delivery, BenefitScheme.APPLICABLE, "PROMOCODE-A");
    const deliveryDiscountRate = new InvoiceLineItem(1, 1, "Discount Rate A", 0, 1, FeeSystemType.Voucher, FeeType.Delivery, BenefitScheme.APPLICABLE, "PROMOCODE-B", 0.25);

    // Benefits
    const benefitDeductAmount50 = new InvoiceLineItem(1, 1, "BenefitMax50", 0, 1, FeeSystemType.Benefit, FeeType.Payment, BenefitScheme.DEDUCTIBLE_AMOUNT, "PRUSHIELD-A1", 50);
    const benefitDeductAmount100 = new InvoiceLineItem(1, 1, "BenefitMax100", 0, 1, FeeSystemType.Benefit, FeeType.Payment, BenefitScheme.DEDUCTIBLE_AMOUNT, "PRUSHIELD-A2", 100);
    const benefitDeductAmount50Rate20 = new InvoiceLineItem(1, 1, "BenefitMax50 20%", 0, 1, FeeSystemType.Benefit, FeeType.Payment, BenefitScheme.DEDUCTIBLE_RATE, "PRUSHIELD-B1", 50, 0.2);
    const benefitDeductAmount100Rate50 = new InvoiceLineItem(1, 1, "BenefitMax100 50%", 0, 1, FeeSystemType.Benefit, FeeType.Payment, BenefitScheme.DEDUCTIBLE_RATE, "PRUSHIELD-B2", 100, 0.5);
    const benefitLimit5 = new InvoiceLineItem(1, 1, "Benefit-5", 0, 1, FeeSystemType.Benefit, FeeType.Payment, BenefitScheme.LIMIT, "PRUSHIELD-C", 5);
    const benefitPool300 = new InvoiceLineItem(1, 1, "Benefit-300", 0, 1, FeeSystemType.Benefit, FeeType.Payment, BenefitScheme.POOL, "PRUSHIELD-C", 300);
    const benefitCopay5 = new InvoiceLineItem(1, 1, "Benefit-CoPay 5", 0, 1, FeeSystemType.Benefit, FeeType.Payment, BenefitScheme.COPAY_AMOUNT, "PRUSHIELD-D", 100, null, 5);
    const benefitCopay10 = new InvoiceLineItem(1, 1, "Benefit-CoPay 10", 0, 1, FeeSystemType.Benefit, FeeType.Payment, BenefitScheme.COPAY_AMOUNT, "PRUSHIELD-D", 150, null, 10);
    const benefitCopay10P = new InvoiceLineItem(1, 1, "Benefit-CoPay 10%", 0, 1, FeeSystemType.Benefit, FeeType.Payment, BenefitScheme.COPAY_AMOUNT, "PRUSHIELD-E", 100, 0.1);
    const benefitCopay15P = new InvoiceLineItem(1, 1, "Benefit-CoPay 15%", 0, 1, FeeSystemType.Benefit, FeeType.Payment, BenefitScheme.COPAY_AMOUNT, "PRUSHIELD-E", 150, 0.15);
}
