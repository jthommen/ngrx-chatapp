import { ApplicationState } from "../store/application-state";


export function userNameSelector(state: ApplicationState): string {

    // Errorhandling if at beginning of app state is not defined
    const currentUserId = state.uiState.userId,
    currentParticipant = state.storeData.participants[currentUserId];

    if(!currentParticipant){  
        return "";
    }

    return currentParticipant.name;
    
}