import { IJourneyHook } from "../../hooks/useJourney";

export interface FormProps {
    journey: IJourneyHook;
    onNext: (e: any) => void;
    onBack?: (e: any) => void;
}
