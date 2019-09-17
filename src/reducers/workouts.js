import produce from "immer";
import * as Const from "src/config/actionConstants";

const initialState = {
  tempSessionWeights: {}, //saved to weights once session completed
  weights: {},
  notes: {},
  sessionsCompleted: [],
  sessionsRestarted: []
};

export default function workouts(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Const.STORE_EXERCISE_WEIGHTS:
        draft.weights[action.exercise_id] = { ...action.data, updated: true };
        break;
      case Const.STORE_TEMP_EXERCISE_WEIGHTS: // local weights saved inside workout session
        if (typeof draft.tempSessionWeights == "undefined") {
          draft.tempSessionWeights = {};
        }

        if (typeof draft.tempSessionWeights[action.session_id] == "undefined") {
          draft.tempSessionWeights[action.session_id] = {};
        }

        draft.tempSessionWeights[action.session_id][action.exercise_id] =
          action.data;
        break;
      case Const.STORE_EXERCISE_NOTE:
        if (!draft.notes) {
          draft.notes = {};
        }
        draft.notes[action.exercise_id] = [];
        draft.notes[action.exercise_id].push({ ...action.data, updated: true });
        break;
      case Const.EXERCISE_NOTES_SAVED_TO_DB:
        if (draft.notes[action.exercise_id]) {
          draft.notes[action.exercise_id][action.note_index].updated = false;
          draft.notes[action.exercise_id][action.note_index].db_id = action.id;
        }
      case Const.EXERCISE_WEIGHTS_SAVED_TO_DB:
        if (draft.notes[action.exercise_id]) {
          draft.weights[action.exercise_id][action.note_index].updated = false;
          draft.weights[action.exercise_id][action.note_index].db_id =
            action.id;
        }
        // draft.notes[action.exercise_id]
        break;
      case Const.WORKOUT_SESSION_COMPLETED:

      break;
      default:
        return state;
    }
  });
}
