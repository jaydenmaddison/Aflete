import * as Const from "src/config/actionConstants";

export function storeTempExerciseWeights(data) {
  // Based on session
  return {
    type: Const.STORE_TEMP_EXERCISE_WEIGHTS,
    data
  };
}

export function addExerciseWeights(data) {
  return {
    type: Const.STORE_EXERCISE_WEIGHTS,
    data
  };
}

export function addExerciseNote(data) {
  return {
    type: Const.STORE_EXERCISE_NOTE,
    dataÎ
  };
}

export function exerciseNoteSavedToDb(data){
    return {
    type: Const.EXERCISE_NOTES_SAVED_TO_DB,
    dataÎ
  };
}

export function exerciseWeightsSavedToDb(data){
    return {
    type: Const.EXERCISE_WEIGHTS_SAVED_TO_DB,
    dataÎ
  };
}

export function workoutSessionCompleted(data){
    return {
    type: Const.WORKOUT_SESSION_COMPLETED,
    dataÎ
  };
}

export function workoutSessionRestarted(data){
    return {
    type: Const.WORKOUT_SESSION_RESTARTED,
    dataÎ
  };
}

