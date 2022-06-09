import { IJourneyState } from "../../hooks/useJourney";

export interface FormProps {
    journey: IJourneyState;
    onNext: (e: any) => void;
    onBack?: (e: any) => void;
}
